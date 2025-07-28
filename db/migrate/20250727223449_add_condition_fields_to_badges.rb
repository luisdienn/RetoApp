class AddConditionFieldsToBadges < ActiveRecord::Migration[8.0]
  def change
    add_column :badges, :condition_type, :string
    add_column :badges, :condition_value, :string
  end
end
