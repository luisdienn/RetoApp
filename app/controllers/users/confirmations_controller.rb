# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  # GET /resource/confirmation/new
  # def new
  #   super
  # end

  # POST /resource/confirmation
 def create
    self.resource = resource_class.send_confirmation_instructions(resource_params)

    render json: {
      success: true,
      message: "If the email address is registered, a confirmation email has been sent.",
      redirect_url: after_resending_confirmation_instructions_path_for
    }, status: :ok
  
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  # def show
  #   super
  # end

  protected

  # The path used after resending confirmation instructions.
  def after_resending_confirmation_instructions_path_for
    "/"
  end

  # The path used after confirmation.
  def after_confirmation_path_for(resource_name, resource)
    sign_in(resource_name, resource)
    "/dashboard" 
  end
end
