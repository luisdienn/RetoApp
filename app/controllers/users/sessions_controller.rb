# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
    before_action :set_headers, only: [:new] 
    respond_to :html, :json


  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
def create
  self.resource = warden.authenticate(auth_options)

  if self.resource
    
    sign_in(resource_name, resource)
    user = User.find_by(email: params[:user][:email])
    
    if user.role == "admin"
      render json: { success: true, redirect_url: admin_path(resource) }
    else
      render json: { success: true, redirect_url: after_sign_in_path_for(resource) }
    end

  else
    user = User.find_by(email: params[:user][:email])

    if user && user.unlock_token.present?
      render json: { success: false, errors: ["Your account is locked due to too many unsuccessful login attempts. Please check your email."] }, status: :unauthorized
    else
      render json: { success: false, errors: ["Invalid email or password"] }, status: :unauthorized
    end
  end
end



  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  protected
  def after_sign_in_path_for(resource)
    "/dashboard" 
  end

  def set_headers
    response.headers["Expires"] = "#{1.day.from_now.to_formatted_s(:rfc2616)}"
    response.headers["Pragma"] = "no-cache"
    response.headers["Cache-Control"] = "no-cache"
  end

  def admin_path (resource)
    "/admin"
  end



  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
