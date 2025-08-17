FactoryBot.define do
  factory :field do
    location { nil }
    name { "MyString" }
    size { "MyString" }
    active { false }
    slot_length_mins { 1 }
    price { 1 }
  end
end
