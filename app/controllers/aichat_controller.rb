class AichatController < ApplicationController
    before_action :authenticate_user!

    def create
        question = params[:msg]
        answer = BoxcarsChatService.chat(question, current_user)
        render json: { answer: answer }
    end
end