class Booking < ApplicationRecord
  # Associations
  #
  # @!attribute [rw] user
  #   @return [User] The user who made the booking.
  #
  # @!attribute [rw] field
  #   @return [Field] The field where the booking is made.
  belongs_to :user
  belongs_to :field

  # Allowed booking statuses.
  #
  # @return [Array<String>] Possible values: "pending", "confirmed", "cancelled".
  STATUSES = %w[pending confirmed cancelled].freeze

  # Validations
  validates :starts_at, :ends_at, presence: true
  validate :ends_after_starts
  validates :status, inclusion: { in: STATUSES }
  validate :no_overlap

  # Scope to get all bookings within a specific day (based on timezone).
  #
  # @param date [String] Date in "YYYY-MM-DD" format.
  # @param tz [String] Time zone (default: "UTC").
  # @return [ActiveRecord::Relation<Booking>] Bookings occurring on the given date.
  #
  # @example
  #   Booking.on_day("2025-08-22", tz: "America/Chicago")
  scope :on_day, -> (date, tz:"UTC") {
    zone = ActiveSupport::TimeZone[tz] || Time.zone
    from = zone.parse("#{date} 00:00").utc
    to = zone.parse("#{date} 23:59").utc
    where(starts_at: from..to)
  }

  private

  # Validation: ensures the booking end time is after the start time.
  #
  # @return [void]
  def ends_after_starts
    if starts_at.present? && ends_at.present? && ends_at <= starts_at
      errors.add(:ends_at, "must be after starts at")
    end
  end

  # Validation: ensures the booking time does not overlap with another booking for the same field.
  #
  # @return [void]
  def no_overlap
    return if field_id.blank? || starts_at.blank? || ends_at.blank?
    overlap = Booking
      .where(field_id: field_id)
      .where.not(id: id)
      .where("starts_at < ? AND ends_at > ?", ends_at, starts_at)
      .exists?
    errors.add(:base, "time slot overlaps an existing booking") if overlap
  end
end
