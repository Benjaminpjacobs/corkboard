class UserRole < ApplicationRecord
  validates :role, presence: true
  validates :user, presence: true

  belongs_to :user
  belongs_to :role
end