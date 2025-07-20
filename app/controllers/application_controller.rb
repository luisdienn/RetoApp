class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :configure_permitted_parameters, if: :devise_controller?

    protected

  def authenticate_user!
    unless user_signed_in?
      redirect_to "/"
    end
  end

  def auth_admin!
    unless current_user.role == "admin"
      redirect_to "/401"
    end
  end

  def is_active!
    unless current_user.active === true
      redirect_to "/"
    end
  end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :image, :role])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :image, :role])
    end
end
