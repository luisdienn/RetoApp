require 'rails_helper'

RSpec.describe "Devise mapping", type: :request do
  it "can map User model" do
    user = create(:user)
    expect { sign_in user }.not_to raise_error
  end
end
