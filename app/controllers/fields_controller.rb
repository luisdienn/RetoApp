class FieldsController < ApplicationController
  before_action :authenticate_user!, :is_active!
  before_action :auth_business!, only: %i[create update destroy]

    def create
        @field  =Field.new(field_params)
        if @field.save
        render json: { success: true, redirect_url: request.referer }
        else
        render json: { success: false, errors: @field.errors.full_messages }
        end
    end

    def update
        @field = Field.find(params[:id])

        if @field.update(field_params)
        render json: { success: true, redirect_url: request.referer }
        else
        render json: { success: false, errors: @field.errors.full_messages }
        end
    end

    def destroy
        @field = Field.find(params[:id])
        if @field.destroy
        render json: { success: true, redirect_url: request.referer }
        else
        render json: { success: false, errors: @field.errors.full_messages }
        end
    end

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
                .where("starts_at < ? AND ends_at > ?",end_utc,start_utc)
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
    def field_params
        params.require(:field).permit(:location_id, :name, :size, :active, :slot_length_mins, :price)
    end



end
