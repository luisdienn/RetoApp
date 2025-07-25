class AddDescriptionToBadges < ActiveRecord::Migration[8.0]
  def change
    add_column :badges, :description, :text
  end
end
