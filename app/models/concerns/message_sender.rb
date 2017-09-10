module MessageSender
  def self.send_code(phone_number, code)
    account_sid = ENV['TWILIO_API_KEY']
    auth_token  = ENV['TWILIO_TOKEN']

    client = Twilio::REST::Client.new(account_sid, auth_token)

    client.messages.create(
      from:  ENV['TWILIO_PHONE'],
      to:    phone_number,
      body:  code
    )
  end
end
