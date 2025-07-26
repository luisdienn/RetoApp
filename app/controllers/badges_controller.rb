class BadgesController < ApplicationController
  before_action :authenticate_user!, :is_active!

  def index
    @user = current_user
    @badges = Badge.all
  end

  def update
    @badge = Badge.find(params[:id])

    if @badge.update(badge_params)
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @badge.errors.full_messages }
    end
  end

def create
  if params[:badge][:image]
    image = params[:badge][:image]
    filename = "#{SecureRandom.hex(8)}_#{image.original_filename}"
    filepath = Rails.root.join("public", "assets", "Badges", filename)
    File.open(filepath, "wb") { |f| f.write(image.read) }


    image_url = "assets/Badges/#{filename}"
  end

  @badge = Badge.new(
    name: params[:badge][:name],
    description: params[:badge][:description],
    image_url: image_url
  )

  if @badge.save
    render json: { success: true, redirect_url: request.referer }
  else
    render json: { success: false, errors: @badge.errors.full_messages }
  end
end


  def destroy
    @badge = Badge.find(params[:id])
      if @badge.destroy
        render json: { success: true, redirect_url: request.referer }
      else
        render json: { success: false, errors: @badge.errors.full_messages }
      end
  end


  protected


  def badge_params
    params.require(:badge).permit(:name, :description, :image_url)
  end

end
