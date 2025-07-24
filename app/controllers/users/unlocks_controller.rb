# frozen_string_literal: true

# Controller for handling account unlocks using Devise.
# Overrides default Devise behavior to provide JSON responses.
class Users::UnlocksController < Devise::UnlocksController

  # POST /resource/unlock
  #
  # Sends unlock instructions to the user’s email if the account is locked.
  #
  # @return [JSON] success message and redirect URL
  def create
    self.resource = resource_class.send_unlock_instructions(resource_params)

    render json: {
      success: true,
      message: "If the email address is registered, a confirmation email has been sent.",
      redirect_url: after_sending_unlock_instructions_path_for
    }, status: :ok
  end

  # GET /resource/unlock/new
  # def new
  #   super
  # end

  # GET /resource/unlock?unlock_token=abcdef
  # def show
  #   super
  # end

  protected

  # Defines the path to redirect after sending unlock instructions.
  #
  # @return [String] the redirect path (root)
  def after_sending_unlock_instructions_path_for
    "/"
  end

  # Defines the path to redirect after a successful unlock.
  #
  # @param resource [User] the unlocked user
  # @return [String] the dashboard path
  def after_unlock_path_for(resource)
    "/dashboard"
  end
end
