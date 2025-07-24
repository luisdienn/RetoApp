# frozen_string_literal: true

# Custom controller for handling password reset functionality using Devise.
# Supports both HTML and JSON responses.
class Users::PasswordsController < Devise::PasswordsController
  respond_to :html, :json

  # POST /resource/password
  #
  # Sends password reset instructions to the user's email.
  #
  # @return [JSON] A success message and redirect path if instructions were sent.
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)

    if successfully_sent?(resource)
      render json: {
        success: true,
        message: "Reset password instructions sent successfully.",
        redirect_url: after_sending_reset_password_instructions_path_for(resource_name)
      }, status: :ok
    else
      render json: {
        success: true,
        redirect_url: after_sending_reset_password_instructions_path_for(resource_name)
      }, status: :ok
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  #
  # Renders the password reset form and assigns the token for use in the view.
  #
  # @return [void]
  def edit
    super
    @token = params[:reset_password_token]
  end

  # PUT /resource/password
  #
  # Updates the user's password using the provided reset token.
  #
  # @return [JSON] A success message and redirect URL if successful, or error messages if not.
  def update
    self.resource = resource_class.reset_password_by_token(resource_params_aux)
    if resource.errors.empty?
      render json: {
        success: true,
        message: "Password updated successfully.",
        redirect_url: after_resetting_password_path_for(resource)
      }, status: :ok
    else
      render json: {
        success: false,
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  protected

  # Strong parameters for resetting the password.
  #
  # @return [ActionController::Parameters] permitted parameters
  def resource_params_aux
    params.require(:user).permit(:password, :password_confirmation, :reset_password_token)
  end

  # Path to redirect to after a successful password reset.
  #
  # @param resource [User] the user who reset the password
  # @return [String] the redirect path
  def after_resetting_password_path_for(resource)
    "/"
  end

  # Path to redirect to after sending password reset instructions.
  #
  # @param resource_name [Symbol] the name of the Devise resource
  # @return [String] the redirect path
  def after_sending_reset_password_instructions_path_for(resource_name)
    "/"
  end
end
