# 🚀 Vibe Code Editor

**Vibe Code Editor** is a cutting-edge, AI-powered, browser-based Integrated Development Environment (IDE) designed to provide a seamless coding experience directly in your web browser. Built with the latest web technologies, it allows you to write, run, and debug code without any local setup.

---

## ✨ Features

- **🌐 In-Browser Runtime**: Powered by **WebContainer API**, allowing you to run Node.js, npm, and full-stack applications entirely in the browser.
- **💻 Pro-Grade Editor**: Features the **Monaco Editor** (the engine behind VS Code) with syntax highlighting, IntelliSense, and multi-cursor support.
- **🤖 AI-Powered Coding**: Integrated **AI Chat** module to help you generate code, debug errors, and explain complex logic in real-time.
- **📟 Integrated Terminal**: High-performance terminal powered by **Xterm.js** for executing commands, managing dependencies, and viewing logs.
- **🔐 Secure Authentication**: Robust user management and authentication system using **NextAuth.js**.
- **📊 Project Dashboard**: Organize and manage your projects, starters, and playgrounds from a centralized dashboard.
- **🌓 Modern UI/UX**: Sleek, responsive interface built with **Tailwind CSS 4**, **Radix UI**, and **Framer Motion** for a premium feel.

---

## 🛠️ Tech Stack

### Frontend & Framework
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

### Core IDE Engine
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Runtime**: [WebContainer API](https://webcontainers.io/)
- **Terminal**: [Xterm.js](https://xtermjs.org/)

### Backend & Database
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A MongoDB instance (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/vibe-code-editor.git
   cd vibe-code-editor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   DATABASE_URL="your_mongodb_url"
   NEXTAUTH_SECRET="your_secret"
   # Add other required environment variables
   ```

4. **Prisma Setup:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see your IDE in action!

---

## 📂 Project Structure

```text
src/
├── app/            # Next.js App Router (Routes & Pages)
├── components/     # Shared UI components (Radix, Shadcn)
├── modules/        # Feature-specific logic
│   ├── ai-chat/    # AI Assistant integration
│   ├── playground/ # Main editor interface
│   ├── webcontainer/# Browser runtime logic
│   └── dashboard/  # User project management
├── lib/            # Utility functions & Shared configurations
└── prisma/         # Database schema & Client
```

---

Developed with ❤️ by [Samir Rain](https://github.com/samir-rain)
