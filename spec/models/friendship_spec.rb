require 'rails_helper'

RSpec.describe Friendship, type: :model do
  describe 'associations' do
    it { should belong_to(:requester).class_name('User') }
    it { should belong_to(:receiver).class_name('User') }
  end

  describe 'validations' do
    it { should validate_presence_of(:status) }
  end

  describe 'factories' do
    it 'is valid with valid attributes' do
      friendship = build(:friendship)
      expect(friendship).to be_valid
    end

    it 'is invalid without a status' do
      friendship = build(:friendship, status: nil)
      expect(friendship).not_to be_valid
      expect(friendship.errors[:status]).to include("can't be blank")
    end

    
  end
end
