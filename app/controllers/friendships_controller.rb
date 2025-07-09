class FriendshipsController < ApplicationController
  before_action :authenticate_user!

  def index
    #agrega
        @user = current_user
        @friendships = @user.received_friendships.where(status: "accepted")

  end

  def profile
    #tengo que validar que el usuario sea amigo
    @user = current_user
    @frienduser = User.find(params[:id])
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







end
