class LocationsController < ApplicationController
  before_action :authenticate_user!, :is_active!
  before_action :auth_user!, only: %i[index show]
  before_action :auth_business!, only: %i[create update destroy]

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

    def create
        @location = current_user.locations.build(location_params)

        if @location.save
            render json: { success: true, redirect_url: request.referer }
        else
            render json: { success: false, errors: @location.errors.full_messages }
        end
    end

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


    def destroy
        @location = Location.find(params[:id])
        if @location.destroy
        render json: { success: true, redirect_url: request.referer }
        else
        render json: { success: false, errors: @location.errors.full_messages }
        end
    end

    def availability
        date = params[:date].presence || Date.current.to_s
        size = params[:size].presence || "5v5"
        tz   = params[:tz].presence   || "UTC"
        slots = @location.hourly_slots_for(date, size: size, tz: tz, slot_minutes: 60)

        respond_to do |format|
        format.json { render json: slots }
        end
    end

    
    private
    def location_params
        params.require(:location).permit(
        :name, :address, :phone, :details, :open_time, :close_time,
        :latitude, :longitude,
        images: [],
        tags: []
        )
    end

end
