class BusinessController < ApplicationController
  before_action :authenticate_user!, :auth_business!

  # Displays the business dashboard with user, locations, fields, and bookings.
  #
  # @return [void]
  #
  # @note This action sets the following instance variables for the view:
  #   - @user [User] The currently logged-in user.
  #   - @locations [ActiveRecord::Relation<Location>] Locations owned by the user.
  #   - @fields [ActiveRecord::Relation<Field>] Fields associated with the user's locations.
  #   - @bookings [Array<Array>] Array of booking data containing:
  #     - booking id
  #     - user name
  #     - location name
  #     - field name
  #     - booking start time
  #     - booking end time
  def index
    @user = current_user
    @locations = Location.where(user_id: current_user.id)
    @fields = Field.where(location: @locations)        
    @bookings = Booking.joins(field: {location: :user}).where(users: {id: current_user.id}).pluck("bookings.id , users.name ,locations.name, fields.name,bookings.starts_at,bookings.ends_at ")
  end

  # Shows all locations belonging to the current business user.
  #
  # @return [void]
  #
  # @note This action sets:
  #   - @user [User] The currently logged-in user.
  #   - @locations [ActiveRecord::Relation<Location>] Locations owned by the user.
  def all
    @user = current_user
    @locations = Location.where(user_id: current_user.id)
  end

  # Displays details of a specific location, including fields and images.
  #
  # @return [void]
  #
  # @note This action sets:
  #   - @user [User] The currently logged-in user.
  #   - @location [Location] The requested location.
  #   - @fields [ActiveRecord::Relation<Field>] Fields associated with the location.
  #
  # @respond [HTML] Renders the default location view.
  # @respond [JSON] Returns the location data with:
  #   - images [Array<String>] URLs of attached images.
  #   - tags [Array<String>] Tags associated with the location.
  #
  # @example JSON response
  #   {
  #     "id": 1,
  #     "name": "Soccer Center",
  #     "address": "123 Main St",
  #     "images": ["http://example.com/uploads/img1.png"],
  #     "tags": ["indoor", "synthetic"]
  #   }
  def location
    @user = current_user
    @location = Location.includes(images_attachments: :blob).find(params[:id])
    @fields = @location.fields

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

  private
end
