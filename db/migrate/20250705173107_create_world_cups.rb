class CreateWorldCups < ActiveRecord::Migration[8.0]
  def change
    create_table :world_cups do |t|
      t.references :user, null: false, foreign_key: true
      t.string :current_stage
      t.integer :matches_won
      t.integer :matches_lost
      t.boolean :was_won
      t.boolean :is_active

      t.timestamps
    end
  end
end
