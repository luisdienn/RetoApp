
class BusinessController < ApplicationController

  before_action :authenticate_user!, :auth_business!


  def index
    @user = current_user
    @locations = Location.where(user_id: current_user.id)

    @fields = Field.where(location: @locations)


  end


  def all
    @user = current_user
    @locations = Location.where(user_id: current_user.id)
  end

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
