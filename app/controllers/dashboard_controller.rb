class DashboardController < ApplicationController
  # Ensure the user is authenticated before accessing the dashboard
  # Funciona pero tengo que hacer que al volver tampoco pueda accesar a la pagina despues de cerrar sesion
  before_action :authenticate_user!

  def index
    # Trear la info de la base de datos
    @user = current_user
  end

  
end
