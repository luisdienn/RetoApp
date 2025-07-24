# frozen_string_literal: true

# Custom Devise Confirmations Controller.
# Handles user confirmation logic for email verification.
class Users::ConfirmationsController < Devise::ConfirmationsController

  # POST /resource/confirmation
  #
  # Sends confirmation instructions to the user's email.
  # If the email is registered, the user will receive a confirmation email.
  #
  # @return [JSON] a JSON response with a success message and redirect URL
  def create
    self.resource = resource_class.send_confirmation_instructions(resource_params)

    render json: {
      success: true,
      message: "If the email address is registered, a confirmation email has been sent.",
      redirect_url: after_resending_confirmation_instructions_path_for
    }, status: :ok
  end

  protected

  # The path used after resending confirmation instructions.
  #
  # @return [String] path to redirect after resending instructions
  def after_resending_confirmation_instructions_path_for
    "/"
  end

  # The path used after confirmation.
  #
  # @param resource_name [Symbol] the name of the resource
  # @param resource [Object] the confirmed resource (user)
  # @return [String] path to redirect after confirmation
  def after_confirmation_path_for(resource_name, resource)
    sign_in(resource_name, resource)
    "/dashboard"
  end
end
