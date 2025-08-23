class BookingsController < ApplicationController
  before_action :set_field, only: :create

  # Creates a booking for the current user in the selected field.
  #
  # @return [JSON] JSON response with:
  #   - success: [Boolean] Indicates if the booking was successfully created.
  #   - redirect_url: [String] The referer URL to redirect the user to.
  #   - errors: [Array<String>] Array of error messages if creation fails.
  #
  # @example Successful response
  #   {
  #     "success": true,
  #     "redirect_url": "http://example.com/previous_page"
  #   }
  #
  # @example Failure response
  #   {
  #     "success": false,
  #     "errors": ["Starts at can't be blank"]
  #   }
  def create
    p = booking_payload 

    tz   = p[:tz].presence || "UTC"
    zone = ActiveSupport::TimeZone[tz] || Time.zone

    start_local = zone.parse("#{p[:date]} #{p[:hour]}")
    slot_minutes = @field.slot_length_mins
    starts_at = start_local.utc
    ends_at   = (start_local + slot_minutes.minutes).utc

    @booking = @field.bookings.new(
      user: current_user,
      starts_at: starts_at,
      ends_at: ends_at,
      status: "confirmed"
    )

    if @booking.save
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @booking.errors.full_messages }
    end
  end

  # Destroys a booking by its ID.
  #
  # @return [JSON] JSON response with:
  #   - success: [Boolean] Indicates if the booking was successfully deleted.
  #   - redirect_url: [String] The referer URL to redirect the user to.
  #   - errors: [Array<String>] Array of error messages if deletion fails.
  #
  # @example Successful response
  #   {
  #     "success": true,
  #     "redirect_url": "http://example.com/previous_page"
  #   }
  #
  # @example Failure response
  #   {
  #     "success": false,
  #     "errors": ["Booking not found"]
  #   }
  def destroy
    @booking = Booking.find(params[:id])
    if @booking.destroy
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @badge.errors.full_messages }
    end
  end

  private

  # Sets the field associated with the booking payload.
  #
  # @return [Field] The field to be used for creating the booking.
  def set_field
    @field = Field.find(booking_payload[:field_id])
  end

  # Extracts and normalizes booking parameters.
  #
  # @return [ActionController::Parameters, Hash] The booking payload.
  #   Falls back to `params` if no nested payload is found.
  #
  # @example
  #   {
  #     "field_id": 1,
  #     "date": "2025-08-22",
  #     "hour": "10:00",
  #     "tz": "America/Chicago"
  #   }
  def booking_payload
    params.dig(:book, :payload) || params
  end
end
