# Join model that represents the association between users and badges.
#
# Each record connects a user with a specific badge.
#
# @!attribute [rw] user
#   @return [User] the user who owns the badge
#
# @!attribute [rw] badge
#   @return [Badge] the badge associated with the user
class UserBadge < ApplicationRecord
  # Association to the user who owns the badge.
  #
  # @return [User]
  belongs_to :user

  # Association to the badge that belongs to the user.
  #
  # @return [Badge]
  belongs_to :badge
end
