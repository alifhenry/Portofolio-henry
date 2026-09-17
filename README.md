# 🚀 Minimalist Brutalist Portfolio

Hello everyone! 👋
Let me introduce myself, I'm **Muhammad Henry Alifianto**, a Software Engineer focusing on building high-performance web applications by combining strong system logic and AI efficiency. 

This is my official portfolio website project built with React and Supabase, featuring a clean "Brutalist Light Mode" public-facing site and a secure admin dashboard.

🔗 **Live Demo:** [https://[DOMAIN-VERCEL-ANDA].vercel.app](https://[DOMAIN-VERCEL-ANDA].vercel.app) *(Update with your actual link)*

---

## 🛠️ Tech Stack
This project is built using modern web technologies:
* **ReactJS (Vite)** - Frontend framework
* **Tailwind CSS** - Utility-first CSS framework
* **Supabase** - Backend for portfolio data, certificates, and auth
* **Framer Motion** - Smooth animation library
* **Lucide React** - Icon library
* **React-i18next** - Bilingual support (ID/EN)
* **SweetAlert2** - Beautiful alert dialogs

## ✨ Key Features

**Public (Visitor):**
* Bilingual Support (English & Indonesian).
* Project Showcase (with "On Progress" & "Selesai" status badges).
* Certificate Gallery.
* Interactive Floating Chat Widget (Direct to Email).

**Admin (Dashboard):**
* Secure Login via Supabase Auth.
* Manage Projects (Create, Edit, Delete, Upload Images, Set Status).
* Manage Certificates.

---

## ⚙️ Getting Started (Local Development)

### 1. Clone & Install
```bash
git clone [https://github.com/alifhenry/Portofolio-henry.git](https://github.com/alifhenry/Portofolio-henry.git)
cd Portofolio-henry
npm install

---

## 2. Environment Variables
```bash
Create a .env file in the root directory:

Cuplikan kode
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
Find these in your Supabase project under Settings → API.
⚠️ Never commit .env to version control — make sure it's in .gitignore.