# Controller for managing badge resources.
#
# Handles listing, creation, updating, and deletion of badges.
#
# All actions require an authenticated and active user.
class BadgesController < ApplicationController
  # Ensures the user is authenticated and active before performing any action.
  before_action :authenticate_user!, :is_active!

  # Displays a list of all available badges for the current user.
  #
  # @return [void]
  def index
    @user = current_user
    @badges = Badge.all
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
      image_url: image_url,
      condition_type: params[:badge][:condition_type],
      condition_value: params[:badge][:condition_value],

    )

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
    params.require(:badge).permit(:name, :description, :image_url, :condition_type, :condition_value)
  end
end
