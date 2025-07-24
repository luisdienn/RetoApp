# The base controller for the application.
# It includes shared filters and configuration for all controllers.
class ApplicationController < ActionController::Base
  # Prevents CSRF attacks by using a null session strategy.
  protect_from_forgery with: :null_session

  # Allows only modern browser versions (custom logic or gem-dependent).
  allow_browser versions: :modern

  # Before any Devise controller action, allow additional permitted parameters.
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  # Ensures the user is authenticated before accessing certain actions.
  # Redirects to the root path if not signed in.
  #
  # @return [void]
  def authenticate_user!
    unless user_signed_in?
      redirect_to "/"
    end
  end

  # Restricts access to admin-only sections.
  # Redirects to a 401 page if the user is not an admin.
  #
  # @return [void]
  def auth_admin!
    unless current_user.role == "admin"
      redirect_to "/401"
    end
  end

  # Ensures the current user is marked as active.
  # Redirects to the root path if the user is inactive.
  #
  # @return [void]
  def is_active!
    unless current_user.active === true
      redirect_to "/"
    end
  end

  # Permits additional parameters for Devise user registration and update.
  #
  # @return [void]
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :image, :role])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :image, :role])
  end
end
