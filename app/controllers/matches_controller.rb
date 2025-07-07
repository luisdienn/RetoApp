class MatchesController < ApplicationController
  before_action :authenticate_user!

  def index
    # Trear la info de la base de datos
    @user = current_user
  end

  def create
    
    @match = Match.new(match_params)
    @match.user = current_user
    
    active_world_cup = current_user.world_cups.find_by(is_active: true)


    unless active_world_cup
      active_world_cup = current_user.world_cups.create!(
        current_stage: "Group Stage", 
        matches_won: 0,
        matches_lost: 0,
        was_won: false,
        is_active: true
      )
    end

    @match.world_cup = active_world_cup


    if @match.save
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @match.errors.full_messages }
    end
  end


    private

  def match_params
    params.require(:match).permit(
      :goals,
      :assists,
      :passes,
      :fouls,
      :blocks,
      :opponent,
      :result,
      :score,
      :details,
      :date,
    )
  end

end
