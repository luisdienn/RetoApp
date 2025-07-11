class FriendshipsController < ApplicationController
  before_action :authenticate_user!

  def index
    #agrega
        @user = current_user
        @friendships = @user.received_friendships.where(status: "accepted")
        @allusers= User.all
        

  end

  def profile
    #tengo que validar que el usuario sea amigo
    @user = current_user
    @frienduser = User.find(params[:id])
    @world_cups = @frienduser.world_cups.where(was_won: true).count
    @totalmatches = @frienduser.matches.count
    @friendships = @frienduser.received_friendships.where(status: "accepted").count

    @isfriend = Friendship.find_by(requester_id: @user.id, receiver_id: @frienduser.id)
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
