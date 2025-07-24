require 'rails_helper'

RSpec.describe Match, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:world_cup).optional }
  end

  describe 'validations' do
    it { should validate_numericality_of(:goals).only_integer.allow_nil }
    it { should validate_numericality_of(:fouls).only_integer.allow_nil }
    it { should validate_numericality_of(:assists).only_integer.allow_nil }
    it { should validate_numericality_of(:blocks).only_integer.allow_nil }
    it { should validate_numericality_of(:passes).only_integer.allow_nil }

    it { should validate_presence_of(:date) }
  end

  describe 'factories' do
    it 'is valid with all attributes' do
      match = build(:match)
      expect(match).to be_valid
    end

    it 'is valid without a world cup' do
      match = build(:match, world_cup: nil)
      expect(match).to be_valid
    end
  end
end
