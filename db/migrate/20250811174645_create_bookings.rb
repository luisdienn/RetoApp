class CreateBookings < ActiveRecord::Migration[8.0]
  def change
    create_table :bookings do |t|
      t.references :user,  null: false, foreign_key: true
      t.references :field, null: false, foreign_key: true
      t.datetime :starts_at, null: false
      t.datetime :ends_at,   null: false
      t.string   :status,    null: false, default: "confirmed"
      t.timestamps
    end

    add_index :bookings, [:field_id, :starts_at], unique: true
    add_index :bookings, :starts_at
  end
end
