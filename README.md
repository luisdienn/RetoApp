# ⚽ RetoApp

RetoApp is a full-stack web application that helps football lovers record personal stats, simulate personal World Cups with automatic stage progression, and compare results with friends. It also enables field reservations for real matches, with dedicated flows for clients and business users. Built with Ruby on Rails and React (Shakapacker) and styled with Tailwind CSS.

---

## 📚 Table of Contents

- [Features](#-features)
  - [Client Features](#client-features)
  - [Business Features](#business-features)
- [Tech Stack](#-tech-stack)
- [Environment Setup](#-environment-setup)
  - [Prerequisites](#prerequisites)
  - [Clone the Repo](#clone-the-repo)
  - [Install Dependencies](#install-dependencies)
  - [Database Setup](#database-setup)
  - [Run the App](#run-the-app)
- [User Guide](#-user-guide)
  - [Clients](#clients)
  - [Business Users](#business-users)
- [Terms & Definitions](#-terms--definitions)
- [Troubleshooting (User-Level)](#-troubleshooting-userlevel)
- [Roadmap](#-roadmap)
- [Support & Contact](#-support--contact)
- [Notes](#-notes)

---

## 🚀 Features

### Client Features
- Register personal matches with detailed stats (goals, assists, passes, etc.)
- Earn **badges** by achieving the goal described on each badge
- **Book a field** to play:
  - Filter by **country** or **search by venue name**
  - Choose an available time slot and confirm the reservation
- Manage reservations:
  - View **active reservations**
  - **Cancel** when needed (respecting cancellation rules)
  - Quick access to your **last 3 reservations**
- Track win/loss history, streaks and progress
- Personal World Cups with automatic stage progression


### Business Features
- **Locations**: create, edit, and delete locations (name, address, hours)
- **Fields per location**: add fields so clients can reserve them
- **Reservations view**: see bookings across your locations and **filter** them
- **Tiers (coming soon)**: app is **free for now**; tier will define how many locations each business can add

---

## 🛠 Tech Stack

- **Backend:** Ruby on Rails 7 (`ruby-3.4.4`)
- **Frontend:** React 18+ (via Shakapacker)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **Package Manager (JS):** npm
- **Other tools:**
  - Dotenv (`.env`) for environment configuration
  - Mailer support via SMTP
  - Boxcars + Groq (optional AI integration)

---

## ⚙️ Environment Setup

### Prerequisites
- Ruby `3.4.4`
- Node.js (LTS recommended)
- npm
- PostgreSQL
- Yarn (optional, but recommended for JS deps)
- Redis (optional; only if you enable background jobs such as Sidekiq)
- A `.env` file for local configuration (do **not** commit secrets)

### Clone the Repo
```bash
git clone https://github.com/luisdienn/RetoApp.git
cd RetoApp
