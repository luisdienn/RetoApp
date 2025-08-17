class RenameOldToNewInTable < ActiveRecord::Migration[8.0]
  def change
        rename_column :fields, :price_cents, :price
  end
end
