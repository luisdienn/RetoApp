require 'rails_helper'

RSpec.describe WorldCup, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:matches).dependent(:destroy) }
  end

  describe 'factories' do
    it 'has a valid factory' do
      world_cup = build(:world_cup)
      expect(world_cup).to be_valid
    end
  end

  describe 'attributes' do
    let(:world_cup) { build(:world_cup) }

    it 'has a current_stage' do
      expect(world_cup.current_stage).to be_a(String)
    end

    it 'has a boolean for was_won' do
      expect([true, false]).to include(world_cup.was_won)
    end

    it 'has matches_won and matches_lost as integers' do
      expect(world_cup.matches_won).to be_a(Integer)
      expect(world_cup.matches_lost).to be_a(Integer)
    end
  end
end
