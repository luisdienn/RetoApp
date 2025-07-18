# frozen_string_literal: true

class Users::UnlocksController < Devise::UnlocksController
  # GET /resource/unlock/new
  # def new
  #   super
  # end

  # POST /resource/unlock
 def create
    self.resource = resource_class.send_unlock_instructions(resource_params)

    render json: {
      success: true,
      message: "If the email address is registered, a confirmation email has been sent.",
      redirect_url: after_sending_unlock_instructions_path_for
    }, status: :ok
  
  end


  # GET /resource/unlock?unlock_token=abcdef
  # def show
  #   super
  # end

  # protected

  # The path used after sending unlock password instructions
  def after_sending_unlock_instructions_path_for
    "/"
  end

  # The path used after unlocking the resource
  def after_unlock_path_for(resource)
    "/dashboard"
  end
end
