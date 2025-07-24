# Controller for managing match records for the authenticated user.
#
# Handles listing matches, creating new ones, and updating existing ones,
# while managing the user's active World Cup progress.
class MatchesController < ApplicationController
  # Ensure the user is authenticated before allowing access to any action.
  before_action :authenticate_user!, :is_active!

  # GET /matches
  #
  # Loads all matches belonging to the currently logged-in user.
  #
  # @return [void]
  def index
    @user = current_user
    @matches = @user.matches
  end

  # POST /matches
  #
  # Creates a new match for the current user and associates it with the active World Cup.
  # If there is no active World Cup, one is created automatically.
  # The logic updates the World Cup progress depending on match results.
  #
  # @return [JSON] success or error messages for frontend consumption.
  def create
    @match = Match.new(match_params)
    @match.user = current_user

    active_world_cup = current_user.world_cups.find_by(is_active: true)

    # If there is no active World Cup, create one
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
      # Handle win case and update World Cup progress
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
        # Handle loss case and potential World Cup deactivation
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

  # PUT /matches/:id
  #
  # Updates an existing match with new values.
  #
  # @return [JSON] success or error messages.
  def update
    @match = Match.find(params[:id])

    if @match.update(match_params)
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @match.errors.full_messages }
    end
  end

  private

  # Strong parameters for match creation and update.
  #
  # @return [ActionController::Parameters] permitted attributes for a match
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
      :date
    )
  end
end
