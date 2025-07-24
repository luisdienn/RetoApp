FactoryBot.define do
  factory :match do
    association :user
    association :world_cup
    goals   { Faker::Number.between(from: 0, to: 5) }
    fouls   { Faker::Number.between(from: 0, to: 10) }
    assists { Faker::Number.between(from: 0, to: 3) }
    blocks  { Faker::Number.between(from: 0, to: 5) }
    passes  { Faker::Number.between(from: 10, to: 100) }
    date    { Faker::Date.backward(days: 30) }
  end
end
