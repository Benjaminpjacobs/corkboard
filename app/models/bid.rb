class Bid < ApplicationRecord
  validates :comment, presence: true

  belongs_to :pro, foreign_key: :user_id
  belongs_to :project
  has_many :messages, dependent: :destroy
  has_many :users, through: :messages

  enum status: [:open, :accepted, :rejected, :withdrawn]

  has_many :attachments, as: :attachable
  accepts_nested_attributes_for :attachments

  def close_other_bids
    Bid.where(project_id: project_id, status: 'open')
       .update_all(status: 'rejected')
  end
end
