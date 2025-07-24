# Controller responsible for updating user profile data via JSON.
class CurrentUsersController < ApplicationController

  # PUT /current_users/:id
  #
  # Updates a user's attributes based on the permitted parameters.
  # Returns a JSON response with a redirect URL on success,
  # or an array of error messages on failure.
  #
  # @return [JSON] success and optional redirect_url or errors
  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @user.errors.full_messages }
    end
  end

  protected

  # Strong parameters for user updates.
  #
  # @return [ActionController::Parameters] the allowed user attributes
  def user_params
    params.require(:user).permit(:image, :name, :email, :role, :active)
  end
end
