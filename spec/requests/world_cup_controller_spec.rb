require 'rails_helper'

RSpec.describe "WorldCupController", type: :request do
  describe "GET /world_cup" do
    context "when user is authenticated" do
      let(:user) { create(:user) }

      before do
        sign_in user
      end

      it "returns http success" do
        get world_cup_index_path
        expect(response).to have_http_status(:success)
      end

      it "creates a new active World Cup if none exists" do
        expect {
          get world_cup_index_path
        }.to change { user.world_cups.count }.by(1)

        expect(user.world_cups.last.is_active).to be true
      end

      it "does not create a new World Cup if one already exists" do
        create(:world_cup, user: user, is_active: true)
        expect {
          get world_cup_index_path
        }.not_to change { user.world_cups.count }
      end
    end

    context "when user is not authenticated" do
      it "redirects to sign in page" do
        get world_cup_index_path
        expect(response).to redirect_to(root_path)
      end
    end
  end
end
