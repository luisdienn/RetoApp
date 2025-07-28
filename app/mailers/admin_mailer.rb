# Handles sending administrative emails related to user reports.
#
# @note Emails are sent from "retoapp@0e266947da642923.maileroo.org"
class AdminMailer < ApplicationMailer
  default from: "retoapp@0e266947da642923.maileroo.org"

  # Sends the daily user report PDF to a specified admin email.
  #
  # The email includes:
  # - A PDF attachment named "user_report_YYYY-MM-DD.pdf"
  # - A subject line with the current date
  # - An HTML body with the generation timestamp
  #
  # @param email [String] the recipient's email address
  # @param pdf_path [String] the file path to the PDF report to be attached
  # @return [Mail::Message] the prepared mail object
  def user_report_email(email, pdf_path)
    attachments["user_report_#{Time.zone.today}.pdf"] = {
        mime_type: 'application/pdf',
        content: File.read(pdf_path)
    }

    mail(
        to: email,
        subject: "Daily User Report - #{Time.zone.today.strftime('%d %B %Y')}"
    ) do |format|
        format.html { render html: "<p>Report generated on #{Time.zone.now.strftime("%A, %d %B %Y at %H:%M")}</p>".html_safe }
    end
  end
end
