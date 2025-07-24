# Represents a World Cup tournament instance associated with a user.
#
# Tracks the progress and results of the user's participation in a World Cup.
#
# @!attribute [rw] user_id
#   @return [Integer] ID of the user who owns this World Cup instance.
#
# @!attribute [rw] current_stage
#   @return [String] The current stage of the World Cup (e.g., "Group Stage", "Final").
#
# @!attribute [rw] matches_won
#   @return [Integer] Number of matches won during the tournament.
#
# @!attribute [rw] matches_lost
#   @return [Integer] Number of matches lost during the tournament.
#
# @!attribute [rw] was_won
#   @return [Boolean] Whether the user won the World Cup.
#
# @!attribute [rw] is_active
#   @return [Boolean] Whether this World Cup is currently in progress.
class WorldCup < ApplicationRecord
  # The user who owns this World Cup
  #
  # @return [User]
  belongs_to :user

  # Matches played in this World Cup
  #
  # @return [Array<Match>]
  has_many :matches, dependent: :destroy
end
