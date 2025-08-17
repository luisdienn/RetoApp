class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :field

  STATUSES = %w[pending confirmed cancelled].freeze

  validates :starts_at, :ends_at, presence: true
  validate :ends_after_starts
  validates :status, inclusion: { in: STATUSES }

  validate :no_overlap

  scope :on_day, -> (date,tz:"UTC"){
    zone = ActiveSupport::TimeZone[tz] || Time.zone
    from = zone.parse("#{date} 00:00").utc
    to = zone.parse("#{date} 23:59").utc
    where(starts_at: from..to)
  }

  private

  def ends_after_starts
    if starts_at.present? && ends_at.present? && ends_at <= starts_at
      errors.add(:ends_at, "must be after starts at")
    end
  end

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
