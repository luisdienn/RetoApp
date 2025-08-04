# ⚽ RetoApp

RetoApp is a full-stack web application that allows users to track personal football statistics, simulate personal World Cups with automatic stage progression, and compare results with friends. Built with Ruby on Rails and React using Shakapacker, styled with Tailwind CSS.

---

## 🚀 Features

- Register personal matches with detailed stats (goals, assists, passes, etc.)
- Create and simulate custom World Cups
- Track your win/loss history and progress
- Add friends and compare stats
- AI-powered assistant 
- Admin panel for badge and notification management

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
- Redis (if using background jobs like Sidekiq)
- `.env` file

### Clone the Repo

```bash
git clone https://github.com/luisdienn/RetoApp.git
cd RetoApp
