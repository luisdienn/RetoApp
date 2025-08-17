class AddAddressAndPhoneToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :address, :string, null: true
    add_column :users, :phone, :string, null: true
  end
end
