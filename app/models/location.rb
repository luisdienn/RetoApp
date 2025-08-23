class Location < ApplicationRecord
  # Extends Geocoder functionality for geocoding by address.
  extend Geocoder::Model::ActiveRecord
  
  # Associations
  #
  # @!attribute [rw] user
  #   @return [User] The user (business) that owns this location.
  #
  # @!attribute [rw] fields
  #   @return [Array<Field>] The fields available at this location.
  #
  # @!attribute [rw] images
  #   @return [ActiveStorage::Attached::Many] Attached images for the location.
  belongs_to :user
  has_many :fields, dependent: :destroy
  has_many_attached :images

  # Geocoding configuration
  #
  # Uses the address attribute to set latitude and longitude.
  geocoded_by :address
  after_validation :geocode, if: -> { address_changed? && latitude.blank? && longitude.blank? }

  # Validations
  validates :name, :address, :open_time, :close_time, presence: true
  validate :close_after_open
  validates :tags, length: { maximum: 10 }

  private

  # Validation: ensures close_time is after open_time.
  #
  # @return [void]
  def close_after_open
    return if open_time.blank? || close_time.blank?
    if close_time <= open_time
      errors.add(:close_time, "must be after open time")
    end
  end
end
