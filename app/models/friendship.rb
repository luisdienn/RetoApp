# Represents a friendship relationship between two users.
#
# A friendship has a requester (who sent the request) and a receiver (who received it),
# and can include a status to indicate whether it's pending, accepted, or declined.
#
# @!attribute [rw] requester_id
#   @return [Integer] the ID of the user who initiated the friendship
#
# @!attribute [rw] receiver_id
#   @return [Integer] the ID of the user who received the friendship request
#
# @!attribute [rw] status
#   @return [String] the current status of the friendship (e.g., "pending", "accepted", "declined")
class Friendship < ApplicationRecord
  # The user who sent the friendship request
  #
  # @return [User]
  belongs_to :requester, class_name: "User"

  # The user who received the friendship request
  #
  # @return [User]
  belongs_to :receiver, class_name: "User"

  # Validates presence of status (e.g., "pending", "accepted", "declined")
  validates :status, presence: true


end
