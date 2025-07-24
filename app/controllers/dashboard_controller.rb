# Controller responsible for rendering the user dashboard view.
#
# Displays statistics for the current year and lifetime totals of matches,
# goals, assists, fouls, blocks, passes, and won World Cups.
class DashboardController < ApplicationController
  # Before accessing any action, ensures the user is authenticated
  # and marked as active in the system.
  before_action :authenticate_user!, :is_active!

  # GET /dashboard
  #
  # Loads and assigns statistics for the current user:
  # - Matches played in the current year
  # - Totals for goals, assists, fouls, passes, blocks (current year)
  # - The most recent match
  # - Lifetime total matches and goals
  # - Number of won World Cups
  #
  # @return [void]
  def index
    @user = current_user

    # Yearly stats
    @matchesyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).count
    @goalsyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).sum(:goals)
    @foulsyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).sum(:fouls)
    @assistsyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).sum(:assists)
    @blocksyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).sum(:blocks)
    @passesyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).sum(:passes)

    # Last match
    @lastmatchaux = @user.matches.last
    if @lastmatchaux != nil
      @lastmatch = @lastmatchaux
    else
      @lastmatch = ""
    end

    # Lifetime stats
    @totalmatches = @user.matches.count
    @totalgoals = @user.matches.sum(:goals)
    @world_cups = @user.world_cups.where(was_won: true).count
  end
end
