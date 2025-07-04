require "test_helper"

class WorldCupControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get world_cup_index_url
    assert_response :success
  end
end
