# Service class responsible for verifying and assigning badges to a user
# based on predefined conditions stored in each Badge record.
#
# It supports conditions like:
# - Total matches played
# - Total goals scored
# - Number of World Cups won
#
# @example Usage
#   verifier = BadgeVerifier.new(current_user)
#   verifier.verify_all
class BadgeVerifier
  # Initializes the badge verifier for a specific user.
  #
  # @param user [User] the user to evaluate for badge conditions
  def initialize(user)
    @user = user
  end

  # Verifies all badges against the user's stats and assigns any they qualify for.
  #
  # @return [void]
  def verify_all
    Badge.all.each { |badge| verify(badge) }
  end

  private

  # Verifies a single badge against the user's data.
  #
  # Supported condition types:
  # - "matches_played"
  # - "goals_scored"
  # - "world_cups_won"
  #
  # @param badge [Badge] the badge to verify and potentially assign
  # @return [void]
  def verify(badge)
    case badge.condition_type
    when "matches_played"
      value = @user.matches.count
    when "goals_scored"
      value = @user.matches.sum(:goals)
    when "world_cups_won"
      value = @user.world_cups.where(was_won: true).count
    else
      return
    end

    if meets_condition?(value, badge.condition_value)
      assign_badge(badge)
    end
  end

  # Checks whether the user's value meets the badge's condition.
  #
  # Condition formats:
  # - "50..99" → range
  # - "200+" → greater than or equal
  # - "100" → exact value
  #
  # @param value [Integer] the user’s actual value
  # @param condition [String] the badge's condition string
  # @return [Boolean] whether the condition is satisfied
  def meets_condition?(value, condition)
    if condition.include?("..")
      range = eval(condition)
      range.include?(value)
    elsif condition.include?("+")
      value >= condition.to_i
    else
      actual = condition.to_i
    end
  end

  # Assigns the badge to the user if they don't already have it.
  #
  # @param badge [Badge] the badge to assign
  # @return [void]
  def assign_badge(badge)
    return if @user.badges.include?(badge)

    UserBadge.create!(user: @user, badge: badge)
  end
end
