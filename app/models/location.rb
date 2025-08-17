class Location < ApplicationRecord
  extend Geocoder::Model::ActiveRecord
  
  belongs_to :user
  has_many :fields, dependent: :destroy
  has_many_attached :images

  geocoded_by :address
  after_validation :geocode, if: -> { address_changed? && latitude.blank? && longitude.blank? }

  validates :name, :address, :open_time, :close_time, presence: true
  validate :close_after_open

  
  validates :tags, length: { maximum: 10 } 

   def hourly_slots_for(date, size:, tz: "UTC", slot_minutes: 60)
    zone = ActiveSupport::TimeZone[tz] || Time.zone
    day_open  = zone.parse("#{date} #{open_time.strftime('%H:%M')}")
    day_close = zone.parse("#{date} #{close_time.strftime('%H:%M')}")
    return [] if day_close <= day_open

    # All fields of requested size
    candidate_fields = fields.where(active: true, size: size)
    return [] if candidate_fields.none?

    # Build hourly ticks, convert to UTC for storage/queries
    ticks_local = []
    t = day_open
    while (t + slot_minutes.minutes) <= day_close
      ticks_local << t
      t += slot_minutes.minutes
    end
    ticks_local.map do |local_start|
      start_utc = local_start.utc
      end_utc   = (local_start + slot_minutes.minutes).utc

      # Count bookings overlapping this window
      booked_count = Booking
        .where(field_id: candidate_fields.select(:id))
        .where("starts_at < ? AND ends_at > ?", end_utc, start_utc)
        .count

      {
        starts_at_utc: start_utc,
        ends_at_utc:   end_utc,
        free:          [candidate_fields.count - booked_count, 0].max
      }
    end
  end

  private

  def close_after_open
    return if open_time.blank? || close_time.blank?
    if close_time <= open_time
      errors.add(:close_time, "must be after open time")
    end
  end

end
