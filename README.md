# FollowUp - Automated Billing Follow-Up

## Project Structure
- `client/`: React + Vite + Tailwind frontend.
- `server/`: Node.js + Express + TypeScript backend.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Clerk Account (for Auth)

### Setup

1. **Clone the repo** (if applicable).
2. **Install dependencies**:
   ```bash
   # In client/
   npm install
   
   # In server/
   npm install
   ```
3. **Configure Environment Variables**:
   - Copy `.env.example` to `.env` in both `client/` and `server/`.
   - Fill in your Clerk keys.

4. **Run the app**:
   ```bash
   # In server/
   npm run dev
   
   # In client/
   npm run dev
   ```

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, TanStack Query.
- **Backend**: Node.js, Express, TypeScript, better-sqlite3.
- **Auth**: Clerk.
