# Controller for administrative actions.
# Only accessible by authenticated users with the admin role.
class AdminController < ApplicationController

  # Ensures the user is authenticated before accessing any action.
  before_action :authenticate_user!, :auth_admin!



  # GET /admin
  # Loads the current user and retrieves all non-admin users.
  #
  # @return [void]
  def index
    @user = current_user
    @allusers = User.where.not(role: "admin")
  end

  # GET /admin/users
  # Loads the current user and retrieves all users, including admins.
  #
  # @return [void]
  def users
    @user = current_user
    @allusers = User.all
  end

  # GET /admin/badges
  # Loads the current badges and retrieves all badges.
  #
  # @return [void]
  def badges
    @user = current_user
    @badges = Badge.includes(image_attachment: :blob)

    respond_to do |format|
        format.html 
        format.json do
        render json: @badges.map { |badge|
            badge.as_json.merge(
            image: badge.image.attached? ? url_for(badge.image): nil)
        }
        end
    end
  end

  private

end
