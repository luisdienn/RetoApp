class Field < ApplicationRecord
  belongs_to :location
  has_many :bookings, dependent: :destroy

  SIZES = %w[5v5 7v7 9v9 11v11].freeze

  validates :name, presence: true
  validates :size, inclusion: { in: SIZES }
  validates :slot_length_mins, numericality: { in: 60..120 }
  
end
