class FriendshipsController < ApplicationController
  before_action :authenticate_user!

  def index
    #agrega
        @user = current_user
        @usermatches = @user.matches
        @userwc = @user.world_cups.where(was_won: true).count
        @friendships = @user.requested_friendships.where(status: "accepted")


        #Matches and World Cups Array for friends
          friends_matches_aux = []
          friends_wc_aux = []
          friends_aux =[]



          if @friendships
            @friendships.each do |friend|
                requester = User.find(friend.receiver_id)
                friends_aux.push(requester)
                friends_matches_aux += requester.matches     
                friends_wc_aux += requester.world_cups.where(was_won: true)
            end
            @friends_matches = friends_matches_aux
            @friends_wc = friends_wc_aux
            @friends = friends_aux
          end





        @allusers= User.active.where.not(role: "admin")
        

  end

  def profile
    #tengo que validar que el usuario sea amigo
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
    end

  end


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


def update
  @friendship = Friendship.find(params[:id])

  # Solo el receptor puede aceptar o rechazar
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

def friendship_params
  params.require(:friendship).permit(:status)
end





end
