class LocationsController < ApplicationController
  before_action :authenticate_user!, :is_active!
  before_action :auth_user!, only: %i[index show]
  before_action :auth_business!, only: %i[create update destroy]

  # Lists all locations with their images and tags.
  #
  # @return [JSON, HTML]
  #   - HTML: Renders the index view.
  #   - JSON: Returns a list of locations including images and tags.
  #
  # @note Sets:
  #   - @user [User] The currently logged-in user.
  #   - @locations [ActiveRecord::Relation<Location>] Locations ordered by creation date.
  #   - @bookings [Array<Array>] Booking data (id, start, location name, field name).
  def index
    @user = current_user
    @locations = Location.includes(images_attachments: :blob).order(created_at: :desc)
    @bookings = @user.bookings.joins(field: :location).pluck("bookings.id , bookings.starts_at ,locations.name, fields.name ")

    respond_to do |format|
      format.html 
      format.json do
        render json: @locations.map { |location|
          location.as_json.merge(
            images: location.images.map { |img| url_for(img) },
            tags: location.tags
          )
        }
      end
    end
  end

  # Shows details for a specific location, including images and active fields.
  #
  # @return [JSON, HTML]
  #   - HTML: Renders the show view.
  #   - JSON: Returns location details with images and tags.
  #
  # @param params [ActionController::Parameters] Expected to include:
  #   - id [Integer] The ID of the location.
  def show
    @user = current_user
    @location = Location.includes(images_attachments: :blob).find(params[:id])
    @fields = @location.fields.where(active: true)

    respond_to do |format|
      format.html 
      format.json do
        render json: @location.as_json.merge(
          images: @location.images.map { |img| url_for(img) },
          tags: @location.tags
        )
      end
    end
  end

  # Creates a new location for the current user.
  #
  # @return [JSON] JSON response with:
  #   - success [Boolean] Whether the location was successfully created.
  #   - redirect_url [String] The referer URL.
  #   - errors [Array<String>] Validation errors if creation fails.
  def create
    @location = current_user.locations.build(location_params)

    if @location.save
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @location.errors.full_messages }
    end
  end

  # Updates an existing location by ID.
  #
  # @return [JSON] JSON response with:
  #   - success [Boolean] Whether the location was successfully updated.
  #   - redirect_url [String] The referer URL.
  #   - errors [Array<String>] Validation errors if update fails.
  #
  # @param params [ActionController::Parameters] Expected to include:
  #   - id [Integer] The location ID.
  #   - location[:remove_images] [Array<String>] Optional list of image URLs to remove.
  def update
    @location = Location.find(params[:id])

    if params.dig(:location, :remove_images).present?
      params[:location][:remove_images].each do |img_url|
        file_name = img_url.split("/").last
        img = @location.images.find do |i|
          i.filename == file_name
        end
        img&.purge
      end
    end

    if @location.update(location_params)
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @location.errors.full_messages }
    end
  end

  # Deletes a location by ID.
  #
  # @return [JSON] JSON response with:
  #   - success [Boolean] Whether the location was successfully deleted.
  #   - redirect_url [String] The referer URL.
  #   - errors [Array<String>] Errors if deletion fails.
  #
  # @param params [ActionController::Parameters] Expected to include:
  #   - id [Integer] The location ID.
  def destroy
    @location = Location.find(params[:id])
    if @location.destroy
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @location.errors.full_messages }
    end
  end



  private

  # Strong parameters for creating or updating a location.
  #
  # @return [ActionController::Parameters] Sanitized parameters including:
  #   - name [String]
  #   - address [String]
  #   - phone [String]
  #   - details [String]
  #   - open_time [Time]
  #   - close_time [Time]
  #   - latitude [Float]
  #   - longitude [Float]
  #   - images [Array<ActiveStorage::Attached>] Image uploads.
  #   - tags [Array<String>] Associated tags.
  def location_params
    params.require(:location).permit(
      :name, :address, :phone, :details, :open_time, :close_time,
      :latitude, :longitude,
      images: [],
      tags: []
    )
  end
end
