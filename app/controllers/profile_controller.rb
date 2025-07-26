# Controller responsible for handling the user's profile page.
#
# Requires the user to be authenticated before accessing any action.
class ProfileController < ApplicationController
  # Ensures that a user is logged in before accessing the index action.
  before_action :authenticate_user!,:is_active!

  # GET /profile
  #
  # Loads and assigns user-specific data to be displayed in the profile view:
  # - Current user data
  # - Accepted friends
  # - Pending friend requests
  # - Total matches played
  # - World cups won
  # - Badges Won
  # @return [void]
    def index
      @user = current_user

      # Retrieve all accepted friendships for the current user
      @friends = User.active.where(id: @user.requested_friendships.where(status: "accepted").pluck(:receiver_id))

      # Retrieve all pending friend requests received by the user
      @notifications = @user.received_friendships.where(status: "pending")

      # Get the list of user IDs who sent the pending friend requests
      @user_ids = @notifications.pluck(:requester_id)

      # Retrieve the user objects of those who sent requests
      @requesters = User.where(id: @user_ids)

      # Count total matches played by the user
      @totalmatches = @user.matches.count
     
      # Count world cups won by the user
      @world_cups = @user.world_cups.where(was_won: true).count

      match_badge_verification
      goals_badge_verification
      wc_badge_verification

      # Retrive the badges links won by the user
      @badges = @user.badges


    end


    def match_badge_verification
      aux_matches = @totalmatches

      badge_name = case aux_matches
                  when 50..99
                    "BronceMatches"
                  when 100..199
                    "SilverMatches"
                  when 200..Float::INFINITY
                    "GoldMatches"
                  else
                    nil
                  end

      return unless badge_name

      badge = Badge.find_by(name: badge_name)
      return unless badge

      unless @user.badges.include?(badge)
        UserBadge.create!(
          user: @user,
          badge: badge
        )
      end
    end

    def goals_badge_verification
      aux_goals = @user.matches.sum(:goals)

      badge_name = case aux_goals
                  when 100..249
                    "BronceGoals"
                  when 250..499
                    "SilverGoals"
                  when 500..Float::INFINITY
                    "GoldGoals"
                  else
                    nil
                  end

      return unless badge_name

      badge = Badge.find_by(name: badge_name)
      return unless badge

      unless @user.badges.include?(badge)
        UserBadge.create!(
          user: @user,
          badge: badge
        )
      end
    end

    def wc_badge_verification
      if @world_cups >= 1

        badge = Badge.find_by(name: "WorldCup")

      unless @user.badges.include?(badge)
        UserBadge.create!(
          user: @user,
          badge: badge
        )
      end
    end

    end



end
