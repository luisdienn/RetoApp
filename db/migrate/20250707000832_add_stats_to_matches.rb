class AddStatsToMatches < ActiveRecord::Migration[8.0]
  def change
    add_column :matches, :fouls, :integer
    add_column :matches, :assists, :integer
    add_column :matches, :blocks, :integer
    add_column :matches, :passes, :integer
    add_column :matches, :opponent, :string
  end
end
