class BookingsController < ApplicationController
    def create
        tz = params[:tz].presence || "UTC"
        zone = ActiveSupport::TimeZone[tz] || Time.zone

        
        start_local = zone.parse("#{params[:date]} #{params[:hour]}")
        slot_minutes = @field.slot_length_mins
        starts_at = start_local.utc
        ends_at   = (start_local + slot_minutes.minutes).utc


        @booking = @field.bookings.new(user: current_user, starts_at: starts_at, ends_at: ends_at, status: "confirmed")

        if @booking.save
            render json: { success: true, redirect_url: request.referer }
        else
            render json: { success: false, errors: @booking.errors.full_messages }
        end

    end

    def destroy
        @booking = Booking.find(params[:id])

        if @booking.user_id == current_user.id || @booking.field.location.user_id == current_user.id
            @booking.destroy
            render json: { success: true, redirect_url: request.referer }
        else
            render json: { success: false, errors: @booking.errors.full_messages }
        end
    end
end
