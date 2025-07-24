# Controller responsible for handling the World Cup view for the current user.
#
# Ensures the user has an active World Cup, and calculates relevant statistics for display.
class WorldCupController < ApplicationController
  # Ensures the user is authenticated before accessing any action.
  before_action :authenticate_user!, :is_active!

  # GET /world_cup
  #
  # Prepares all data required for displaying the current user's World Cup dashboard:
  # - Initializes a new active World Cup if one does not exist
  # - Loads all matches for the current active World Cup
  # - Calculates total goals, total World Cups played, and won
  # - Computes the current winning streak
  #
  # @return [void]
  def index
    @user = current_user

    # Find the current active World Cup for the user
    @currentwcaux = @user.world_cups.where(is_active: true).first

    # If none exists, create a new one
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

    # Retrieve all matches played in the current World Cup
    @matches = @user.matches.where(world_cup: @currentwc)

    # Total goals scored in the current World Cup
    @goals = @user.matches.where(world_cup: @currentwc).sum(:goals)

    # Total World Cups the user has played
    @totalwc = @user.world_cups.count

    # Total World Cups the user has won
    @world_cups = @user.world_cups.where(was_won: true).count

    # Calculate the user's current win streak across all matches
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
