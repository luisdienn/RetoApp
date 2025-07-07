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
  #  validates :name, presence: true


    # Relaciones
  has_many :world_cups, dependent: :destroy
  has_many :matches, dependent: :destroy

  # Friendships (para saber a quién pediste y quién te pidió)
  has_many :requested_friendships, class_name: "Friendship", foreign_key: "requester_id", dependent: :destroy
  has_many :received_friendships, class_name: "Friendship", foreign_key: "receiver_id", dependent: :destroy

  # Validaciones opcionales



end
