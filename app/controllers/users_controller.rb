class UsersController < ApplicationController
  before_filter :omniauth_user

  def new
    @user = User.new
    @oauth_info = OauthParse.new(session[:omniauth_info])
  end

  def create
    @user = User.new(user_params)
    @user.uid = session[:omniauth_info]['uid'] if omniauth_user
    if @user.save
      session[:user_id] = @user.id
      authy = Authy::API.register_user(
        email: @user.email,
        cellphone: @user.phone_number,
        country_code: @user.country_code
      )
      @user.update(authy_id: authy.id)
      Authy::API.request_sms(id: @user.authy_id)
      session.delete(:omniauth_info)
      redirect_to twilio_confirmation_path
    else
      flash.now[:danger] = @user.errors.full_messages
      render :new
    end
  end

  def verify
    @user = current_user
    token = Authy::API.verify(id: @user.authy_id, token: params[:token])
    if token.ok?
      @user.update(verified: true)
      flash[:success] = "You successfully verified your account!"
      send_message('You successfully verified your account!')
      redirect_to user_path(@user.id)
    else
      flash.now[:danger] = "Incorrect code, please try again"
      render :show_verify
    end
  end

  def resend
    @user = current_user
    Authy::API.request_sms(id: @user.authy_id)
    flash[:notice] = 'Verification code re-sent'
    redirect_to verify_path
  end


  private

  def user_params
    params.require(:user).permit(:first_name,
                                 :last_name,
                                 :zipcode,
                                 :country_code,
                                 :phone_number,
                                 :email,
                                 :password,
                                 :password_confirmation)
  end

  def send_message(message)
    @user = current_user
    twilio_number = ENV['TWILIO_NUMBER']
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    @client = Twilio::REST::Client.new account_sid, ENV['TWILIO_AUTH_TOKEN']
    message = @client.api.accounts(account_sid).messages.create(
      :from => twilio_number,
      :to => @user.country_code+@user.phone_number,
      :body => message
    )
  end

end
