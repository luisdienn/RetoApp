FactoryBot.define do
  factory :location do
    user { nil }
    name { "MyString" }
    address { "MyString" }
    latitude { "9.99" }
    longitude { "9.99" }
    phone { "MyString" }
    details { "MyText" }
    tags { "MyString" }
    open_time { "2025-08-11 11:54:34" }
    close_time { "2025-08-11 11:54:34" }
  end
end
