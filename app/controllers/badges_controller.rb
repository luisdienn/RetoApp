class BadgesController < ApplicationController
  before_action :authenticate_user!, :is_active!

  def index
    @user = current_user

    @badges = Badge.all
  end
end
