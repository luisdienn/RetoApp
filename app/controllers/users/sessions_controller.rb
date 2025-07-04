# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
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
      render json: { success: true, redirect_url: after_sign_in_path_for(resource) }
    else
      render json: { success: false, errors: ["Invalid email or password"] }, status: :unauthorized
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  protected
  def after_sign_in_path_for(resource)
    "/users/password/new" # Redirect to the unlock page after sign in
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
