require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      user = User.new(
        name: "Test User",
        email: "user@example.com",
        password: "Secure123!",
        password_confirmation: "Secure123!",
        active: true
      )
      expect(user).to be_valid
    end

    it 'is invalid without a name' do
      user = User.new(name: nil)
      user.validate
      expect(user.errors[:name]).to include("Name can't be blank")
    end

    it 'is invalid with improperly formatted email' do
      user = User.new(email: "invalid_email")
      user.validate
      expect(user.errors[:email]).to include("Follow the format: example@example.com")
    end

    it 'is invalid with weak password' do
      user = User.new(password: "password")
      user.validate
      expect(user.errors[:password]).to include(/Must contain at least one/)
    end
  end

  describe 'associations' do
    it { should have_many(:world_cups).dependent(:destroy) }
    it { should have_many(:matches).dependent(:destroy) }
    it { should have_many(:requested_friendships).dependent(:destroy) }
    it { should have_many(:received_friendships).dependent(:destroy) }
  end

  describe 'scopes' do
    before do
      @active_user = create(:user, active: true)
      @inactive_user = create(:user, active: false)
    end

    it 'returns only active users' do
      expect(User.active).to include(@active_user)
      expect(User.active).not_to include(@inactive_user)
    end

    it 'returns only inactive users' do
      expect(User.inactive).to include(@inactive_user)
      expect(User.inactive).not_to include(@active_user)
    end
  end

  describe '#active_for_authentication?' do
    it 'returns true if user is active' do
      user = build(:user, active: true)
      expect(user.active_for_authentication?).to be true
    end

    it 'returns false if user is inactive' do
      user = build(:user, active: false)
      expect(user.active_for_authentication?).to be false
    end
  end
end
