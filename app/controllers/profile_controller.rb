# Controller responsible for handling the user's profile page.
#
# Requires the user to be authenticated before accessing any action.
class ProfileController < ApplicationController
  # Ensures that a user is logged in before accessing the index action.
  before_action :authenticate_user!, :is_active!

  # GET /profile
  #
  # Loads and assigns user-specific data to be displayed in the profile view:
  # - Current user data
  # - Accepted friends
  # - Pending friend requests
  # - Total matches played
  # - World cups won
  # - Badges won
  #
  # Also triggers badge verification methods for matches, goals, and world cups.
  #
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

    # Verify badges based on matches, goals, and world cups
    BadgeVerifier.new(@user).verify_all


    # Retrieve the badges links won by the user
    @badges = @user.badges
  end


end
