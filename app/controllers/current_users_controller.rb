  class CurrentUsersController < ApplicationController


    def update
    @user = User.find(params[:id])

    if @user.update(user_params)
        render json: { success: true, redirect_url: request.referer }
    else
        render json: { success: false, errors: @user.errors.full_messages }
    end
    end


    protected
    def user_params
    params.require(:user).permit(:image, :name, :email, :role, :active)
    end
end