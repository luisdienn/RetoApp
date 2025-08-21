class BookingsController < ApplicationController
  before_action :set_field, only: :create

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


  def destroy
    @booking = Booking.find(params[:id])
    if @booking.destroy
      render json: { success: true, redirect_url: request.referer }
    else
      render json: { success: false, errors: @badge.errors.full_messages }
    end
  end

  private

  def set_field
    @field = Field.find(booking_payload[:field_id])
  end


  def booking_payload
    params.dig(:book, :payload) || params
  end
end
