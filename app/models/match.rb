# Represents a single football match played by a user.
#
# Each match stores statistical data and is optionally associated with a World Cup.
#
# @!attribute [rw] user_id
#   @return [Integer] ID of the user who played the match.
#
# @!attribute [rw] world_cup_id
#   @return [Integer, nil] ID of the associated World Cup (if any).
#
# @!attribute [rw] goals
#   @return [Integer] Number of goals scored in the match.
#
# @!attribute [rw] fouls
#   @return [Integer] Number of fouls committed in the match.
#
# @!attribute [rw] assists
#   @return [Integer] Number of assists made in the match.
#
# @!attribute [rw] blocks
#   @return [Integer] Number of blocks performed in the match.
#
# @!attribute [rw] passes
#   @return [Integer] Number of passes completed in the match.
#
# @!attribute [rw] date
#   @return [Date] Date the match was played.
class Match < ApplicationRecord
  # The user who played the match
  #
  # @return [User]
  belongs_to :user

  # The associated World Cup (optional)
  #
  # @return [WorldCup, nil]
  belongs_to :world_cup, optional: true

  # Validates that statistical fields are integers if provided
  validates :goals, :fouls, :assists, :blocks, :passes,
            numericality: { only_integer: true },
            allow_nil: true

  # Validates that the match has a date
  validates :date, presence: true
end
