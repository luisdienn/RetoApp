  class AdminController < ApplicationController

    before_action :authenticate_user!
    before_action :auth_admin!

  def index
    @user = current_user
    @allusers = User.where.not(role: "admin")

  end


  def users
    @user = current_user
    @allusers = User.all
  end

  
  
  private





end
