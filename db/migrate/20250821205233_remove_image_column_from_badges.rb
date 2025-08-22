class RemoveImageColumnFromBadges < ActiveRecord::Migration[8.0]
  def change
    remove_column :badges, :image_url
  end
end
