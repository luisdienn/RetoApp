class CreateFriendships < ActiveRecord::Migration[8.0]
  def change
    create_table :friendships do |t|
      t.integer :requester_id, null: false
      t.integer :receiver_id, null: false
      t.string :status

      t.timestamps
    end

    add_foreign_key :friendships, :users, column: :requester_id
    add_foreign_key :friendships, :users, column: :receiver_id
  end
end
