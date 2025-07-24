FactoryBot.define do
  factory :world_cup do
    association :user
    current_stage { %w[Group Round16 QuarterFinal Semifinal Final].sample }
    matches_won { Faker::Number.between(from: 0, to: 7) }
    matches_lost { Faker::Number.between(from: 0, to: 7) }
    was_won { Faker::Boolean.boolean }
    is_active { Faker::Boolean.boolean }
  end
end
