class CreateFields < ActiveRecord::Migration[8.0]
  def change
    create_table :fields do |t|
      t.references :location, null: false, foreign_key: true
      t.string  :name,  null: false
      t.string  :size,  null: false                    
      t.boolean :active, default: true, null: false
      t.integer :slot_length_mins, default: 60, null: false
      t.integer :price_cents
      t.timestamps
    end

    add_index :fields, [:location_id, :size]
  end
end
