class CreateMatches < ActiveRecord::Migration[8.0]
  def change
    create_table :matches do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :goals
      t.string :result
      t.string :score
      t.string :details
      t.date :date
      t.references :world_cup, foreign_key: true

      t.timestamps
    end
  end
end
