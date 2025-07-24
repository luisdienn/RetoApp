FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { "Secure123!" }
    password_confirmation { "Secure123!" }
    active { true }
    confirmed_at { Time.now } # Devise confirmable
  end
end
