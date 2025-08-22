# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_08_21_205233) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "badges", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.string "condition_type"
    t.string "condition_value"
  end

  create_table "bookings", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "field_id", null: false
    t.datetime "starts_at", null: false
    t.datetime "ends_at", null: false
    t.string "status", default: "confirmed", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["field_id", "starts_at"], name: "index_bookings_on_field_id_and_starts_at", unique: true
    t.index ["field_id"], name: "index_bookings_on_field_id"
    t.index ["starts_at"], name: "index_bookings_on_starts_at"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "fields", force: :cascade do |t|
    t.bigint "location_id", null: false
    t.string "name", null: false
    t.string "size", null: false
    t.boolean "active", default: true, null: false
    t.integer "slot_length_mins", default: 60, null: false
    t.integer "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id", "size"], name: "index_fields_on_location_id_and_size"
    t.index ["location_id"], name: "index_fields_on_location_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "requester_id", null: false
    t.integer "receiver_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locations", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.string "address", null: false
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.string "phone"
    t.text "details"
    t.string "tags", default: [], array: true
    t.time "open_time", null: false
    t.time "close_time", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address"], name: "index_locations_on_address"
    t.index ["latitude", "longitude"], name: "index_locations_on_latitude_and_longitude"
    t.index ["name"], name: "index_locations_on_name"
    t.index ["tags"], name: "index_locations_on_tags", using: :gin
    t.index ["user_id"], name: "index_locations_on_user_id"
  end

  create_table "matches", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "goals"
    t.string "result"
    t.string "score"
    t.string "details"
    t.date "date"
    t.bigint "world_cup_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "fouls"
    t.integer "assists"
    t.integer "blocks"
    t.integer "passes"
    t.string "opponent"
    t.index ["user_id"], name: "index_matches_on_user_id"
    t.index ["world_cup_id"], name: "index_matches_on_world_cup_id"
  end

  create_table "user_badges", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "badge_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["badge_id"], name: "index_user_badges_on_badge_id"
    t.index ["user_id"], name: "index_user_badges_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.string "name"
    t.string "image"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true, null: false
    t.string "address"
    t.string "phone"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  create_table "world_cups", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "current_stage"
    t.integer "matches_won"
    t.integer "matches_lost"
    t.boolean "was_won"
    t.boolean "is_active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_world_cups_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "bookings", "fields"
  add_foreign_key "bookings", "users"
  add_foreign_key "fields", "locations"
  add_foreign_key "friendships", "users", column: "receiver_id"
  add_foreign_key "friendships", "users", column: "requester_id"
  add_foreign_key "locations", "users"
  add_foreign_key "matches", "users"
  add_foreign_key "matches", "world_cups"
  add_foreign_key "user_badges", "badges"
  add_foreign_key "user_badges", "users"
  add_foreign_key "world_cups", "users"
end
