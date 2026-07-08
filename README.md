# TrueComp

**Salary transparency for Indian tech companies.**

TrueComp is a full-stack web platform that helps engineers understand what compensation actually looks like across Indian tech companies — normalized onto a universal leveling scale so offers and roles can be meaningfully compared, regardless of how individual companies name their bands internally.

🔗 **Live:** [truecomp.vercel.app](https://truecomp.vercel.app)

---

## 🎯 Why

Compensation benchmarking in the Indian tech market has historically been fragmented and inconsistent. Existing platforms are largely built around US-market conventions and don't account for how Indian companies structure levels, bands, and total compensation.

**TrueComp solves this by:**
- ✅ Normalizing company-specific bands onto a universal L1–L7 scale
- ✅ Showing REAL in-hand salary (after PF, tax, gratuity)
- ✅ Providing AI-powered career insights
- ✅ Enabling anonymous community contributions

---

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Salary Comparison** | Compare compensation data across companies, levels, and cities |
| **Universal Leveling (L1–L7)** | A normalization engine that maps each company's internal band naming (e.g. SDE-2, L4, Senior Engineer) onto a single comparable scale |
| **Company Profiles** | Company-specific compensation breakdowns with level-wise salary data |
| **AI-Powered Tools** | Offer analysis and level comparison to support informed decision-making |
| **Community Contributions** | Anonymized, crowdsourced salary submissions with a live compensation calculator during submission |

### Additional Features

- **JobAI** — AI-powered job matching with auto-apply functionality
- **Career Roast** — Get brutally honest career feedback from AI personalities
- **Layoff Tracker** — Stay updated with the latest layoffs across industries
- **Offer Analyzer** — Upload your offer letter for real-time market analysis
- **Profile Management** — Manage your skills, experience, and career preferences

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Database** | PostgreSQL (Supabase) |
| **ORM** | Prisma |
| **Authentication** | NextAuth.js |
| **Validation** | Zod |
| **Styling** | Tailwind CSS |
| **UI Components** | Lucide React |
| **AI Integration** | OpenAI API |
| **Deployment** | Vercel |

---

## 🏗️ Architecture Highlights

### 1. Leveling Normalization Engine
Maps heterogeneous company band names to a consistent L1–L7 scale for accurate cross-company comparison.

### 2. Schema Design for Crowdsourced Data
Handles validation, deduplication, and flexible data entry (multiple compensation components, city/cost-of-living context) via Prisma + Zod.

### 3. Multi-step Submission Flow
Live comp calculator gives users real-time feedback as they submit data, rather than a black-box form.

### 4. Glass Morphism UI
Modern, premium design system with consistent dark theme across all pages.

---


---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- PostgreSQL database (or Supabase account)

### Installation

```bash
# Clone the repository
git clone https://github.com/samriddhi7777/truecomp.git
cd truecomp

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your DATABASE_URL, Supabase credentials, and NextAuth secrets

# Push database schema
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed the database with initial companies
npx prisma db seed

# Start the development server
npm run dev
📄 License

This project is open for learning and reference purposes. Feel free to explore the code.

👨‍💻 Author

Samriddhi Thakur

GitHub: @samriddhi7777
