class BoxcarsChatService
  def self.chat(msg, current_user)
    connection = ActiveRecord::Base.connection.raw_connection

    schema = {
      "users" => {
        "columns" => ["name", "email"],
        "where_clause" => "id = #{current_user.id}"
      },
      "matches" => {
        "columns" => ["user_id", "goals", "result", "score", "details", "date", "world_cup_id", "fouls", "assists", "blocks", "passes", "opponent"],
        "where_clause" => "user_id = #{current_user.id}"
      },
      "world_cups" => {
        "columns" => ["user_id", "current_stage", "matches_won", "matches_lost", "was_won", "is_active"],
        "where_clause" => "user_id = #{current_user.id}"
      },
      "friendships" => {
        "columns" => ["requester_id", "receiver_id", "status"],
        "where_clause" => "requester_id = #{current_user.id}"
      },
      "user_badges" => {
        "columns" => ["user_id", "badge_id"],
        "where_clause" => "user_id = #{current_user.id}"
      },
      "badges" => {
        "columns" => ["id", "name", "description"]
      }
    }

    agent = Boxcars::SQL.new(
      connection: connection,
      schema: schema
    )

    agent.run(msg)
  end
end
