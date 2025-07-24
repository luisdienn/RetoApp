# Represents an application user with authentication and profile data.
#
# This model includes Devise modules for:
# - Database authentication
# - Registration
# - Password recovery
# - Remember me functionality
# - Email confirmation
# - Account locking after failed attempts
#
# @!attribute [rw] name
#   @return [String] the full name of the user
#
# @!attribute [rw] email
#   @return [String] the user's email address (used for login)
#
# @!attribute [rw] password
#   @return [String] the user’s password (virtual, handled by Devise)
#
# @!attribute [rw] active
#   @return [Boolean] whether the account is active (used in custom logic)
class User < ApplicationRecord
  # Include default Devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable

  # Scope for active users
  #
  # @return [ActiveRecord::Relation]
  scope :active, -> { where(active: true) }

  # Scope for inactive users
  #
  # @return [ActiveRecord::Relation]
  scope :inactive, -> { where(active: false) }

  # Associations
  #
  # @return [ActiveRecord::Associations::CollectionProxy]
  has_many :world_cups, dependent: :destroy

  # @return [ActiveRecord::Associations::CollectionProxy]
  has_many :matches, dependent: :destroy

  # Friendships the user initiated
  #
  # @return [ActiveRecord::Associations::CollectionProxy]
  has_many :requested_friendships, class_name: "Friendship", foreign_key: "requester_id", dependent: :destroy

  # Friendships the user received
  #
  # @return [ActiveRecord::Associations::CollectionProxy]
  has_many :received_friendships, class_name: "Friendship", foreign_key: "receiver_id", dependent: :destroy

  # Validations
  validates :name, presence: { message: "Name can't be blank" }

  # Password complexity validation: must include lowercase, uppercase, digit, and special character
  validates :password, format: {
    with: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{}|;:,.<>?])/,
    message: "Must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
  }, if: :password_present?

  # Email format validation
  validates :email, format: {
    with: URI::MailTo::EMAIL_REGEXP,
    message: "Follow the format: example@example.com"
  }

  # Overrides Devise method to check if the user is active
  #
  # @return [Boolean] true if user is active
  def active_for_authentication?
    super && active
  end

  # Provides a custom message for inactive accounts
  #
  # @return [Symbol] the message key
  def inactive_message
    active ? super : :account_blocked
  end

  private

  # Checks if password is present before validating it
  #
  # @return [Boolean]
  def password_present?
    password.present?
  end
end
