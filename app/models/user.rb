class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
devise :database_authenticatable, :registerable,
       :recoverable, :rememberable, :validatable,
       :confirmable, :lockable

  # Ejemplo scope útil
  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }

  
  # Validations PERO tal vez
  #validates :active, inclusion: { in: [true, false] }
  #  


  has_many :world_cups, dependent: :destroy
  has_many :matches, dependent: :destroy
  has_many :requested_friendships, class_name: "Friendship", foreign_key: "requester_id", dependent: :destroy
  has_many :received_friendships, class_name: "Friendship", foreign_key: "receiver_id", dependent: :destroy

  # Validations
  validates :name, presence: { message: "Name can't be blank" }
    validates :password, format: { 
    with: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{}|;:,.<>?])/,
    message: "Must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
  }
validates :email, format: { 
  with: URI::MailTo::EMAIL_REGEXP,
  message: "Follow the format: example@example.com"
}


end
