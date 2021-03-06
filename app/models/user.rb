class User < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :zipcode, presence: true
  validates_format_of :zipcode,
                      with: /\A\d{5}-\d{4}|\A\d{5}\z/,
                      message: 'should be 12345 or 12345-1234',
                      allow_blank: true

  validates :email, presence: true, uniqueness: true

  has_secure_password validations: false

  has_many :user_roles, dependent: :destroy
  has_many :roles, through: :user_roles

  has_many :requested_projects,
           class_name: 'Project',
           foreign_key: 'requester_id'

  has_many :messages

  def self.from_omniauth(auth_info)
    where(uid: auth_info[:uid]).first_or_initialize do |new_user|
      new_user.uid = auth_info.uid
    end
  end

  def update_uid(uid)
    update_attribute(:uid, uid)
  end

  def pro?
    type == 'Pro'
  end

  def self.locate_by(data, oauth = false)
    oauth ? find_or_initialize_by(uid: data['uid']) : find_by(email: data)
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def open_projects
    requested_projects.open
  end

  def closed_projects
    requested_projects.closed
  end

  def accepted_projects
    requested_projects.accepted
  end

  def projects
    requested_projects
  end
end
