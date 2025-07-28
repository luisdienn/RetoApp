# frozen_string_literal: true

require "prawn"
require "prawn/table"

# Namespace for report generation modules and classes.
module Reports
  # Generates a PDF report of users excluding admins.
  #
  # This class builds a summary PDF with:
  # - Total users (excluding admins)
  # - Number of new users this month
  # - Number of active users
  # - A table listing name, email, role, active status, and creation date
  #
  # The PDF is saved to the path provided.
  class UserReportGenerator
    # Generates the user report PDF at the specified path.
    #
    # @param path [String] the absolute or relative file path where the PDF will be saved
    # @return [void]
    def self.generate(path)
      users = User.where.not(role: "admin")
      new_users = users.where("created_at >= ?", Date.current.beginning_of_month)
      active_users = users.where(active: true)

      data = [["Name", "Email", "Role", "Active", "Created At"]] +
             users.map do |user|
               [
                 user.name,
                 user.email,
                 user.role,
                 user.active ? "Yes" : "No",
                 user.created_at.strftime("%Y-%m-%d %H:%M")
               ]
             end

      Prawn::Document.generate(path) do |pdf|
        pdf.fill_color "000000"
        pdf.text "Daily User Report", size: 20, style: :bold, align: :center
        pdf.move_down 10

        pdf.text "Generated at: #{Time.zone.now.strftime('%Y-%m-%d %H:%M')}", size: 10
        pdf.text "Total users (non-admin): #{users.count}", size: 10
        pdf.text "New users this month: #{new_users.count}", size: 10
        pdf.text "Active users: #{active_users.count}", size: 10
        pdf.move_down 15

        pdf.table(data, header: true, width: pdf.bounds.width) do
          row(0).background_color = "ddc68b"
          row(0).text_color = "000000"
          row(0).font_style = :bold

          cells.padding = 6
          cells.borders = [:bottom]
          cells.border_width = 0.5
          cells.border_color = "aaaaaa"
        end
      end
    end
  end
end
