# Represents a badge that can be awarded to users.
#
# A badge can be associated with many users through the UserBadge join model.
#
# @!attribute [rw] user_badges
#   @return [ActiveRecord::Associations::CollectionProxy<UserBadge>] the join records linking this badge to users
#
# @!attribute [rw] users
#   @return [ActiveRecord::Associations::CollectionProxy<User>] the users who have received this badge
class Badge < ApplicationRecord
  # Association to the join records between badges and users.
  #
  # @return [ActiveRecord::Associations::CollectionProxy<UserBadge>]
  has_many :user_badges

  # Association to users who have been awarded this badge.
  #
  # @return [ActiveRecord::Associations::CollectionProxy<User>]
  has_many :users, through: :user_badges
end
