class Match < ApplicationRecord
  belongs_to :user
  belongs_to :world_cup, optional: true

  # Validaciones opcionales
  validates :goals, :fouls, :assists, :blocks, :passes, numericality: { only_integer: true }, allow_nil: true

  validates :date, presence: true
end
