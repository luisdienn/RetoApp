# Deletes old user report PDFs from the tmp directory.
#
# This job searches for files matching `user_report_*.pdf` in `Rails.root/tmp`
# and deletes them if they exist.
#
# @example Run manually
#   DeleteOldReportsJob.perform_now
#
# @note Intended to be run as a scheduled job (e.g., via Sidekiq or ActiveJob)
class DeleteOldReportsJob < ApplicationJob
  queue_as :default

  # Performs the job by deleting all matching PDF files in the tmp directory.
  #
  # @return [void]
  def perform
    Dir.glob(Rails.root.join("tmp", "user_report_*.pdf")).each do |file|
      File.delete(file) if File.exist?(file)
    end
  end
end
