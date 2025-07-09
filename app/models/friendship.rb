class Friendship < ApplicationRecord
  belongs_to :requester, class_name: "User"
  belongs_to :receiver, class_name: "User"

  # Ejemplo: puedes definir un enum si quieres manejar el estado de la amistad
  #enum status: { pending: "pending", accepted: "accepted", declined: "declined" }

  # Validación opcional
  validates :status, presence: true
end
