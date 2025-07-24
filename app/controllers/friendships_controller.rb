# Controller for managing friendships between users.
#
# Provides actions to list friends, view friend profiles, send friend requests,
# accept or reject them, and delete existing friendships.
class FriendshipsController < ApplicationController
  # Ensures the user is authenticated before accessing any actions.
  before_action :authenticate_user!, :is_active!

  # GET /friendships
  #
  # Lists all accepted friendships for the current user,
  # as well as their matches and won World Cups.
  #
  # Also loads all active users (excluding admins) for potential friend suggestions.
  #
  # @return [void]
  def index
    @user = current_user
    @usermatches = @user.matches
    @userwc = @user.world_cups.where(was_won: true).count
    @friendships = @user.requested_friendships.where(status: "accepted")

    # Arrays to collect friends' data
    friends_matches_aux = []
    friends_wc_aux = []
    friends_aux = []

    # Gather data from accepted friends
    if @friendships
      @friendships.each do |friend|
        requester = User.find(friend.receiver_id)
        if requester.active?
          friends_aux.push(requester)
          friends_matches_aux += requester.matches
          friends_wc_aux += requester.world_cups.where(was_won: true)
        end
      end
      @friends_matches = friends_matches_aux
      @friends_wc = friends_wc_aux
      @friends = friends_aux
    end

    @allusers = User.active.where.not(role: "admin")
  end

  # GET /friendships/:id/profile
  #
  # Shows the public profile of another user if the user is not an admin or the current user.
  #
  # Redirects to error page or profile if not authorized.
  #
  # @return [void]
  def profile
    @user = current_user
    @aux = User.find(params[:id])

    if @aux.role == "admin"
      redirect_to "/401"
    elsif @aux.id == @user.id
      redirect_to "/profile"
    else
      @frienduser = @aux
      @world_cups = @frienduser.world_cups.where(was_won: true).count
      @totalmatches = @frienduser.matches.count
      @friendships = @frienduser.requested_friendships.where(status: "accepted").count
      @isfriend = Friendship.find_by(requester_id: @user.id, receiver_id: @frienduser.id)
      @friends_of_friends = User.active.where(id: @frienduser.requested_friendships.where(status: "accepted").pluck(:receiver_id))
    end
  end

  # POST /friendships
  #
  # Creates a new friendship request with status 'pending'.
  #
  # @return [JSON] success or error messages for frontend handling.
  def create
    @friendship = Friendship.new(
      requester_id: current_user.id,
      receiver_id: params[:friendship][:receiver_id],
      status: "pending"
    )

    if @friendship.save
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @friendship.errors.full_messages }
    end
  end

  # DELETE /friendships/:id
  #
  # Deletes a friendship if the current user is the requester.
  #
  # @return [JSON] success or error message.
  def destroy
    @friendship = Friendship.find(params[:id])

    if @friendship.requester_id == current_user.id
      if @friendship.destroy
        render json: { success: true, redirect_url: request.referer }
      else
        render json: { success: false, errors: @friendship.errors.full_messages }
      end
    else
      render json: { success: false, errors: ["You can only delete friendships you initiated."] }
    end
  end

  # PUT /friendships/:id
  #
  # Updates the status of a friendship (e.g., accepting a request).
  # Only the receiver of the request is authorized to update it.
  #
  # @return [JSON] success or error message.
  def update
    @friendship = Friendship.find(params[:id])

    if @friendship.receiver_id != current_user.id
      return render json: { success: false, errors: ["You are not authorized to update this friendship."] }
    end

    if @friendship.update(friendship_params)
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @friendship.errors.full_messages }
    end
  end

  private

  # Strong parameters for updating a friendship.
  #
  # @return [ActionController::Parameters] permitted status field
  def friendship_params
    params.require(:friendship).permit(:status)
  end
end
