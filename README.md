# CV Builder Application

This project is a **Next.js full-stack application** that allows users to dynamically create, manage, preview, and export their CVs to PDF.  
It was built to demonstrate clean architecture, modular backend design, and client–server integration with MongoDB and TypeScript.

---

## Features

- Create and manage CV sections:
  - Personal Information  
  - Professional Experience  
  - Skills  
  - Education  
  - Interests  
- Dynamic real-time CV preview  
- Export CV as a **PDF**  
- MongoDB integration with Mongoose  
- Data validation using **Zod**  
- Unit testing with **Vitest** and `mongodb-memory-server`  
- Optional Docker setup for full environment isolation  

---

## Installation & Execution

### 1️⃣ Clone Repository
```bash
git clone https://github.com/fajarpostman/cv-builder.git
cd cv-builder
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
MONGODB_URI=mongodb://localhost:27017/cv-builder
NODE_ENV=development
```

You can also override this variable inside Docker using `docker-compose.yml`.

---

## 🐳 Docker Setup (Optional)

To run both the app and MongoDB in containers:
```bash
docker compose up -d
```

- Web app available at: **http://localhost:3000**  
- MongoDB container name: `cv-builder-mongo`

To stop all containers:
```bash
docker compose down
```

---

## Project Structure

```bash
cv-builder/
├── app/
│   ├── api/
│   │   └── sections/         # Next.js API routes for CV data
│   ├── cv/
│   │   ├── components/       # SectionForm, CVPreview, CVTemplate
│   │   ├── actions.ts        # Server-side data handling
│   │   └── page.tsx          # Main CV builder page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
│
├── lib/
│   └── mongoose.ts           # MongoDB connection utility
│
├── models/
│   └── Section.ts            # Mongoose model for CV sections
│
├── schemas/
│   └── section.ts            # Zod validation schemas
│
├── tests/
│   └── section.test.ts       # Unit tests using Vitest
│
├── Dockerfile
├── docker-compose.yml
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## 🧰 Required Configuration

| Variable | Description | Example |
|-----------|--------------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/cv-builder` |
| `NODE_ENV` | Runtime environment | `development` / `production` |

> In Docker, `MONGODB_URI` is automatically set to `mongodb://mongo:27017/cv-builder`.

---

## Technical Choices & Justification

| Aspect | Choice | Reason |
|--------|---------|--------|
| **Framework** | Next.js 14 (App Router) | Unified full-stack environment with server & client in one framework |
| **Language** | TypeScript | Type safety and clean contracts across frontend & backend |
| **Database** | MongoDB + Mongoose | Flexible schema-less structure, easy section-based storage |
| **Validation** | Zod | Strong runtime + compile-time validation, lightweight and reliable |
| **Testing** | Vitest + mongodb-memory-server | Fast and isolated testing without external DB dependencies |
| **PDF Export** | html2pdf.js | Client-side rendering to PDF with minimal setup |
| **Containerization** | Docker Compose | Enables full reproducibility and easy setup for reviewers |

---

## Test & Build Commands

### Run Tests
```bash
npm run test
```
This runs **Vitest** with `mongodb-memory-server` for isolated database testing.

### Build Project
```bash
npm run build
```
Builds the Next.js production bundle.

### Start Production Server
```bash
npm start
```
Starts the app on **http://localhost:3000** using the built output.

---

## 💻 Development Commands

| Command | Description |
|----------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build production-ready app |
| `npm start` | Run production server |
| `npm run test` | Execute unit tests |
| `docker compose up -d` | Run app + MongoDB using Docker |

---

## User Flow

1. Open `http://localhost:3000`  
2. Fill in **Personal Information**  
3. Add **Experience**, **Skills**, **Education**, and **Interests**  
4. See **Live CV Preview** update instantly  
5. Click **Export to PDF** → your CV downloads as `my-cv.pdf`

---

## Author

**Fajar Postman**  
📧 [fajardwirianto3@gmail.com](mailto:fajardwirianto3@gmail.com)  
🌐 [https://github.com/fajarpostman](https://github.com/fajarpostman)

> _“Don't forget to pray before start coding.”_ 🙏

---

## Summary

This project showcases:
- Full-stack engineering skills using **Next.js + MongoDB**
- Clean modular architecture
- Strong **TypeScript + Zod validation**
- Real-world use of **Docker**, **Testing**, and **PDF Export**
