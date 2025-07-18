# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
    respond_to :html, :json

  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
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
            success:true,
            redirect_url: after_sending_reset_password_instructions_path_for(resource_name)
          }, status: :ok
        end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
    super
    @token = params[:reset_password_token]

  end


  # PUT /resource/password
  def update
    self.resource = resource_class.reset_password_by_token(resource_params_aux)
    if resource.errors.empty?
      render json: { success: true, message: "Password updated successfully.", redirect_url: after_resetting_password_path_for(resource) }, status: :ok
    else
      render json: { success: false, errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def resource_params_aux
    params.require(:user).permit(:password, :password_confirmation, :reset_password_token)
  end

  def after_resetting_password_path_for(resource)
    "/"
  end

  # The path used after sending reset password instructions
  def after_sending_reset_password_instructions_path_for(resource_name)
        "/"
  end
end
