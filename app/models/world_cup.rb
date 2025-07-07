class WorldCup < ApplicationRecord
  belongs_to :user
  has_many :matches, dependent: :destroy

  # Validaciones opcionales
  #validates :current_stage, presence: true
end
