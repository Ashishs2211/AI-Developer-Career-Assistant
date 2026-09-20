# 🤖 AI Developer Career Assistant

An AI-powered career assistant built using the **MERN Stack** and **Generative AI** to help students and developers prepare for software development careers.

The platform provides AI-powered tools for resume analysis, GitHub repository analysis, project review, mock interviews, career roadmaps, and career-related conversations.

---

## 🌐 Live Demo

**Frontend:**  
https://ai-developer-career-assistant-three.vercel.app

**Backend API:**  
https://ai-developer-career-assistant-backend.onrender.com

---

## 🚀 Features

### 📄 AI Resume Analyzer
Upload your resume and receive an AI-powered analysis including:
- Resume strengths
- Areas for improvement
- ATS-oriented feedback
- Skills analysis
- Suggestions for improving the resume

### 🐙 GitHub Repository Analyzer
Analyze a public GitHub repository and receive insights about:
- Repository structure
- Technologies used
- Strengths and weaknesses
- Code and architecture suggestions
- Scalability considerations
- Security and performance suggestions

### 📂 AI Project Reviewer
Submit your project information and receive AI-powered feedback about:
- Project quality
- Technology stack
- Architecture
- Strengths
- Weaknesses
- Improvements
- Interview preparation

### 🎤 AI Mock Interview
Practice technical interviews using AI.

Features include:
- Role-based interview questions
- Difficulty-based questions
- Answer evaluation
- AI-generated feedback
- Interview progression

### 🛣️ AI Career Roadmap
Generate a personalized learning roadmap based on:
- Current skills
- Target role
- Experience level
- Career goals

### 💬 AI Career Chat
Ask career, programming, project, and placement-related questions through an AI-powered chat interface.

### 📚 History Management
View previous AI activities and generated results.

### 📊 Analytics Dashboard
View activity-related information through dashboard analytics.

### 🔍 Search & Filter
Search and filter previous activities from the history section.

### 📄 Export Results
Export AI-generated results as PDF.

### 📋 Copy Results
Copy AI-generated reports and responses easily.

### 🔐 Authentication
Secure user authentication using:
- JWT
- Password hashing
- Protected routes

### 👤 User Profile
Manage user profile information and career-related details.

### 📱 Responsive UI
Responsive interface designed for desktop and mobile screens.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- Recharts
- Framer Motion
- React Hot Toast
- React Markdown
- Remark GFM

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Multer
- PDF Parse
- Adm-Zip

## AI

- Google Gemini AI
- OpenRouter

## APIs & Services

- GitHub API
- MongoDB
- Vercel
- Render

---

# 📂 Project Structure

```text
AI-Developer-Career-Assistant/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md