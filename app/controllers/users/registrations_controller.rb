# frozen_string_literal: true

# Custom Devise controller for handling user registrations.
# Overrides the default Devise behavior to support JSON responses.
class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :html, :json

  # POST /resource
  #
  # Handles user registration. Responds with JSON messages for both
  # successful and failed registrations.
  #
  # @return [JSON] Success message and redirect URL, or error messages if registration fails.
  def create
    build_resource(sign_up_params)

    resource.save
    if resource.persisted?
      if resource.active_for_authentication?
        render json: {
          success: true,
          redirect_url: after_sign_up_path_for(resource),
          message: "Welcome! You have successfully registered."
        }
      else
        expire_data_after_sign_in!
        render json: {
          success: true,
          redirect_url: after_inactive_sign_up_path_for(resource),
          message: "Please verify your email address to activate your account."
        }
      end
    else
      clean_up_passwords resource
      render json: {
        success: false,
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  protected

  # Path used after successful sign-up.
  #
  # @param resource [User] the newly registered user
  # @return [String] redirect path
  def after_sign_up_path_for(resource)
    "/"
  end

  # The path used after sign up for inactive accounts.
  #
  # @param resource [User] the newly registered but inactive user
  # @return [String] redirect path
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  # --- Devise default methods commented out ---
  #
  # # GET /resource/sign_up
  # def new
  #   super
  # end
  #
  # # GET /resource/edit
  # def edit
  #   super
  # end
  #
  # # PUT /resource
  # def update
  #   super
  # end
  #
  # # DELETE /resource
  # def destroy
  #   super
  # end
  #
  # # GET /resource/cancel
  # def cancel
  #   super
  # end
  #
  # # Add custom fields to sign up
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end
  #
  # # Add custom fields to account update
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end
