class WorldCupController < ApplicationController
  before_action :authenticate_user!

  def index
    # Trear la info de la base de datos
    @user = current_user



    @currentwcaux = @user.world_cups.where(is_active: true).first

    if @currentwcaux.nil?
      @currentwc = @user.world_cups.create!(
        current_stage: "Group Stage", 
        matches_won: 0,
        matches_lost: 0,
        was_won: false,
        is_active: true
      )
    else
      @currentwc = @currentwcaux
    end

    @matches = @user.matches.where(world_cup: @currentwc)
    @goals = @user.matches.where(world_cup: @currentwc).sum(:goals)
    @totalwc = @user.world_cups.count
    @world_cups = @user.world_cups.where(was_won: true).count

    


    #Winning Streak
    current_streak = 0
    @user.matches.order(id: :desc).each do |match|
      if match.result == "Win"
        current_streak += 1
      else
        break
      end
    end
    @winstreak = current_streak




  end
end
