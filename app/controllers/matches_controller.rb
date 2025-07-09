class MatchesController < ApplicationController
  before_action :authenticate_user!

  def index
    # Trear la info de la base de datos
    @user = current_user
    @matches = @user.matches
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
      if @match.result == "Win"
        active_world_cup.matches_won += 1
        if active_world_cup.matches_won == 2
          active_world_cup.current_stage = "Round of 16"
        end
        if active_world_cup.matches_won == 3 
          active_world_cup.current_stage = "Quarter Finals"
        end
        if active_world_cup.matches_won == 4
                    active_world_cup.current_stage = "Semi Finals"
        end
        if active_world_cup.matches_won == 5
                    active_world_cup.current_stage = "Final"
        end
        if active_world_cup.matches_won == 6
          active_world_cup.was_won = true
          active_world_cup.is_active = false
        end
      else
        active_world_cup.matches_lost += 1

        if active_world_cup.current_stage != "Group Stage" 
          active_world_cup.is_active = false
          active_world_cup.was_won = false
        end

        if active_world_cup.matches_lost >= 2 && active_world_cup.matches.count >= 3
          active_world_cup.is_active = false
          active_world_cup.was_won = false
        end

      end

    
      active_world_cup.save!




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
