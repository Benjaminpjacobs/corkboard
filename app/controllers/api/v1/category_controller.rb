
class Api::V1::CategoryController < ApplicationController
  def index
    render json: Industry.find(params['query']).categories
  end
end