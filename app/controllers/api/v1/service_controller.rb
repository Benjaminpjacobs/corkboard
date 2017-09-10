class Api::V1::ServiceController < ApplicationController
  def index
    render json: Category.find(params[:query]).services
  end
end