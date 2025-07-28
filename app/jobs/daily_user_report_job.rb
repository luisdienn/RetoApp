# Generates the daily user report and sends it to all admin users by email.
#
# This job:
# 1. Generates a PDF report of users (excluding admins) using {Reports::UserReportGenerator}.
# 2. Sends the report to each admin via {AdminMailer#user_report_email}.
#
# @example Run manually
#   DeleteOldReportsJob.perform_now
#
# @note The report is generated in the `tmp` directory with the name:
#   user_report_YYYY-MM-DD.pdf
#
# @note Email delivery is performed asynchronously using `deliver_later`.
class DeleteOldReportsJob < ApplicationJob
  queue_as :default

  # Performs the job by generating the report and emailing it to all admins.
  #
  # @return [void]
  def perform
    pdf_path = Rails.root.join("tmp", "user_report_#{Time.zone.today}.pdf")
    Reports::UserReportGenerator.generate(pdf_path)

    User.where(role: "admin").find_each do |admin|
      AdminMailer.user_report_email(admin.email, pdf_path.to_s).deliver_later
    end
  end
end
