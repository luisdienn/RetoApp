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

    private
    def field_params
        params.require(:field).permit(:location_id, :name, :size, :active, :slot_length_mins, :price)
    end

end
