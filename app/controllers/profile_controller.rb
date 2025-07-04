class ProfileController < ApplicationController
  before_action :authenticate_user!

  def index
    # Trear la info de la base de datos
    @user = current_user
  end
end
