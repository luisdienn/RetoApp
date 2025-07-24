# frozen_string_literal: true

# Custom Devise controller for handling user login sessions.
# Overrides the default Devise session behavior to return JSON responses
# and redirect users based on their role (admin or regular user).
class Users::SessionsController < Devise::SessionsController
  before_action :set_headers, only: [:new]
  respond_to :html, :json

  # POST /resource/sign_in
  #
  # Authenticates a user and returns a JSON response.
  # Redirects admins to the admin panel and regular users to their dashboard.
  #
  # @return [JSON] success or error messages with redirect URLs.
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
        render json: {
          success: false,
          errors: ["Your account is locked due to too many unsuccessful login attempts. Please check your email."]
        }, status: :unauthorized
      else
        render json: {
          success: false,
          errors: ["Invalid email or password"]
        }, status: :unauthorized
      end
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  protected

  # Defines the path to redirect after a successful login for regular users.
  #
  # @param resource [User] the signed-in user
  # @return [String] dashboard path
  def after_sign_in_path_for(resource)
    "/dashboard"
  end

  # Defines HTTP headers to prevent caching for the login page.
  #
  # @return [void]
  def set_headers
    response.headers["Expires"] = "#{1.day.from_now.to_formatted_s(:rfc2616)}"
    response.headers["Pragma"] = "no-cache"
    response.headers["Cache-Control"] = "no-cache"
  end

  # Returns the path to the admin dashboard.
  #
  # @param resource [User] the admin user
  # @return [String] admin path
  def admin_path(resource)
    "/admin"
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
