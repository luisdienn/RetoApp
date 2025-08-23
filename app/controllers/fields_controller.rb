class FieldsController < ApplicationController
  before_action :authenticate_user!, :is_active!
  before_action :auth_business!, only: %i[create update destroy]

  # Creates a new field for a location.
  #
  # @return [JSON] JSON response with:
  #   - success: [Boolean] Whether the field was successfully created.
  #   - redirect_url: [String] The URL to redirect back to.
  #   - errors: [Array<String>] Validation errors if creation fails.
  def create
    @field  = Field.new(field_params)
    if @field.save
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @field.errors.full_messages }
    end
  end

  # Updates an existing field by ID.
  #
  # @return [JSON] JSON response with:
  #   - success: [Boolean] Whether the field was successfully updated.
  #   - redirect_url: [String] The URL to redirect back to.
  #   - errors: [Array<String>] Validation errors if update fails.
  #
  # @param params [ActionController::Parameters] Expected to include:
  #   - id [Integer] The ID of the field to update.
  def update
    @field = Field.find(params[:id])

    if @field.update(field_params)
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @field.errors.full_messages }
    end
  end

  # Deletes a field by ID.
  #
  # @return [JSON] JSON response with:
  #   - success: [Boolean] Whether the field was successfully deleted.
  #   - redirect_url: [String] The URL to redirect back to.
  #   - errors: [Array<String>] Errors if deletion fails.
  #
  # @param params [ActionController::Parameters] Expected to include:
  #   - id [Integer] The ID of the field to delete.
  def destroy
    @field = Field.find(params[:id])
    if @field.destroy
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @field.errors.full_messages }
    end
  end

  # Returns availability slots for a given field and date.
  #
  # @return [JSON] JSON response with:
  #   - success: [Boolean] Always true if the request completes.
  #   - slots: [Array<Hash>] Available time slots, each containing:
  #     - time [String] Local time in HH:MM format.
  #     - available [Boolean] Whether the slot is free.
  #     - starts_at_utc [Time] Start time in UTC.
  #     - ends_at_utc [Time] End time in UTC.
  #
  # @param params [ActionController::Parameters] Expected to include:
  #   - id [Integer] The ID of the field.
  #   - date [String, optional] Date in "YYYY-MM-DD" format (defaults to today).
  #   - tz [String, optional] Timezone name (defaults to "UTC").
  #
  # @example JSON response
  #   {
  #     "success": true,
  #     "slots": [
  #       {
  #         "time": "10:00",
  #         "available": true,
  #         "starts_at_utc": "2025-08-22T16:00:00Z",
  #         "ends_at_utc": "2025-08-22T17:00:00Z"
  #       }
  #     ]
  #   }
  def availability
    @field = Field.find(params[:id])
    date = params[:date].presence || Date.current.to_s
    tz = params[:tz].presence || "UTC"

    slot_minutes = @field.slot_length_mins
    locId = @field.location_id
    loc = Location.find(locId)

    zone = ActiveSupport::TimeZone[tz] || Time.zone
    day_open = zone.parse("#{date} #{loc.open_time.strftime('%H:%M')}")
    day_close = zone.parse("#{date} #{loc.close_time.strftime('%H:%M')}")

    slots = []
    t = day_open
    while (t + slot_minutes.minutes) <= day_close
      start_utc = t.utc
      end_utc = (t + slot_minutes.minutes).utc

      overlap = Booking
        .where(field_id: @field.id)
        .where("starts_at < ? AND ends_at > ?", end_utc, start_utc)
        .exists?

      slots << {
        time: t.strftime('%H:%M'),
        available: !overlap,
        starts_at_utc: start_utc,
        ends_at_utc: end_utc
      }
      t += slot_minutes.minutes
    end

    render json: { success: true, slots: slots }
  end

  private

  # Strong parameters for field creation and update.
  #
  # @return [ActionController::Parameters] Sanitized parameters including:
  #   - location_id [Integer]
  #   - name [String]
  #   - size [String]
  #   - active [Boolean]
  #   - slot_length_mins [Integer]
  #   - price [Decimal]
  def field_params
    params.require(:field).permit(:location_id, :name, :size, :active, :slot_length_mins, :price)
  end
end
