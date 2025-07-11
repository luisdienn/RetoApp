class DashboardController < ApplicationController
  # Ensure the user is authenticated before accessing the dashboard
  # Funciona pero tengo que hacer que al volver tampoco pueda accesar a la pagina despues de cerrar sesion
  before_action :authenticate_user!

  def index
    # Trear la info de la base de datos
    @user = current_user

    @matchesyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).count
    @goalsyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).sum(:goals)
    @foulsyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).sum(:fouls)
    @assistsyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).sum(:assists)
    @blocksyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).sum(:blocks)
    @passesyear = @user.matches.where("date >= ?", Date.today.beginning_of_year).sum(:passes)

     
    @lastmatchaux = @user.matches.last
    if @lastmatchaux != nil
      @lastmatch = @lastmatchaux
    else
      @lastmatch = ""
    end

    @totalmatches = @user.matches.count
    @totalgoals = @user.matches.sum(:goals)
    @world_cups = @user.world_cups.where(was_won: true).count
  end

  
end
