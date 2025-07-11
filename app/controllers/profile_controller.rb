class ProfileController < ApplicationController
  before_action :authenticate_user!

  def index
    # Trear la info de la base de datos
    @user = current_user
    @friends = @user.received_friendships.where(status: "accepted").count
    @notifications = @user.received_friendships.where(status: "pending")


    @user_ids = @notifications.pluck(:requester_id) 
    @requesters = User.where(id: @user_ids) 
    

    @totalmatches = @user.matches.count
    @world_cups = @user.world_cups.where(was_won: true).count


  end
end
