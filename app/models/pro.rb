class Pro < User
  has_many :pro_services, dependent: :destroy, foreign_key: 'user_id'
  has_many :services, through: :pro_services
  has_many :bids, foreign_key: 'user_id'
  has_many :projects, through: :bids
  has_many :reviews, foreign_key: 'user_id'

  geocoded_by :zipcode
  after_validation :geocode

  def open_projects
    Project.where(status: :open, service_id: services)
  end

  def accepted_bid_projects
    projects.where(status: :accepted)
  end

  def closed_projects
    projects.where(status: :closed)
  end

  def radius
    pro_services.first.radius.to_i
  end
end
