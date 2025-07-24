# Controller for administrative actions.
# Only accessible by authenticated users with the admin role.
class AdminController < ApplicationController

  # Ensures the user is authenticated before accessing any action.
  before_action :authenticate_user!

  # Ensures the user has admin privileges before accessing any action.
  before_action :auth_admin!

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

  private

end
