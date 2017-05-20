Rails.application.routes.draw do

  root 'home#index'

  namespace :profile do
    get '/dashboard', to: 'dashboard#show'
  end

  get 'choose-account', as: 'choose_account', to: 'choose_account#index'
  get '/auth/facebook', as: 'facebook_login'
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/register', to: 'users#new'
  post '/register', to: 'users#create'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  
  get '/:industry_slug', to: 'industries#show', as: 'industry'
end
