class Field < ApplicationRecord
  # Associations
  #
  # @!attribute [rw] location
  #   @return [Location] The location this field belongs to.
  #
  # @!attribute [rw] bookings
  #   @return [Array<Booking>] All bookings made for this field.
  belongs_to :location
  has_many :bookings, dependent: :destroy

  # Allowed field sizes.
  #
  # @return [Array<String>] Possible values: "5v5", "7v7", "9v9", "11v11".
  SIZES = %w[5v5 7v7 9v9 11v11].freeze

  # Validations
  #
  # @!attribute [rw] name
  #   @return [String] Must be present.
  #
  # @!attribute [rw] size
  #   @return [String] Must be one of {SIZES}.
  #
  # @!attribute [rw] slot_length_mins
  #   @return [Integer] Must be between 60 and 120 minutes.
  validates :name, presence: true
  validates :size, inclusion: { in: SIZES }
  validates :slot_length_mins, numericality: { in: 60..120 }
end
