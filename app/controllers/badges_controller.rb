# Controller for managing badge resources.
#
# Handles listing, creation, updating, and deletion of badges.
#
# All actions require an authenticated and active user.
class BadgesController < ApplicationController
  # Ensures the user is authenticated and active before performing any action.
  before_action :authenticate_user!, :is_active!
  before_action :auth_user!, only: :index
  before_action :auth_admin!, only: %i[create update destroy]


 


  # Displays a list of all available badges for the current user.
  #
  # @return [void]
  def index
    @user = current_user
    @badges = Badge.includes(image_attachment: :blob)

    respond_to do |format|
        format.html 
        format.json do
        render json: @badges.map { |badge|
            badge.as_json.merge(
            image: badge.image.attached? ? url_for(badge.image): nil)
        }
        end
    end

  end

  # Updates an existing badge with permitted parameters.
  #
  # Responds with JSON indicating success or validation errors.
  #
  # @return [JSON]
  def update
    @badge = Badge.find(params[:id])

    if @badge.update(badge_params)
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @badge.errors.full_messages }
    end
  end

  # Creates a new badge and saves the uploaded image to the public directory.
  #
  # Responds with JSON indicating success or validation errors.
  #
  # @return [JSON]
  def create

    @badge = Badge.build(badge_params)


    if @badge.save
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @badge.errors.full_messages }
    end



  end

  # Deletes the specified badge from the database.
  #
  # Responds with JSON indicating success or failure.
  #
  # @return [JSON]
  def destroy
    @badge = Badge.find(params[:id])
    if @badge.destroy
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @badge.errors.full_messages }
    end
  end

  protected

  # Strong parameters for badge creation and updates.
  #
  # @return [ActionController::Parameters] the permitted badge parameters
  def badge_params
    params.require(:badge).permit(:name, :description, :condition_type, :condition_value, :image)
  end
end
