class CreateLocations < ActiveRecord::Migration[8.0]
  def change
    create_table :locations do |t|
      t.references :user, null: false, foreign_key: true
      t.string  :name,    null: false
      t.string  :address, null: false
      t.decimal :latitude,  precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
      t.string  :phone
      t.text    :details
      t.string  :tags, array: true, default: []
      t.time    :open_time,  null: false
      t.time    :close_time, null: false
      t.timestamps
    end

    add_index :locations, :tags, using: :gin
    add_index :locations, :name
    add_index :locations, :address
    add_index :locations, [:latitude, :longitude]
  end
end
