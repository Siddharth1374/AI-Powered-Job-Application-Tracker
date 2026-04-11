# AI-Powered Job Application Tracker

A full-stack web application to track job applications on a Kanban board. AI automatically parses job descriptions to fill application details and generates tailored resume suggestions.

---

## Features

- **Kanban Board** — Track applications across 5 stages: Applied, Phone Screen, Interview, Offer, Rejected
- **AI Job Parser** — Paste any job description and AI auto-fills company, role, skills, location, and seniority
- **AI Resume Suggestions** — Get tailored resume bullet points generated for each role
- **Drag and Drop** — Move cards across columns as your application progresses
- **JWT Authentication** — Secure register and login system
- **Card Management** — Click any card to view, edit, or delete the application

---

## Tech Stack

### Frontend
- React.js + TypeScript
- Tailwind CSS
- @dnd-kit (drag and drop)
- Axios

### Backend
- Node.js + Express.js + TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Groq AI — LLaMA 3.3-70b

---

## Project Structure

```
job-tracker/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Auth/
│       │   ├── Board/         # KanbanBoard, KanbanColumn
│       │   ├── Card/          # ApplicationCard, ApplicationModal
│       │   └── UI/
│       ├── pages/
│       │   ├── AuthPage.tsx
│       │   └── DashboardPage.tsx
│       ├── services/
│       │   ├── api.ts
│       │   ├── aiService.ts
│       │   └── applicationService.ts
│       ├── store/
│       ├── types/
│       └── hooks/
└── backend/
    └── src/
        ├── controllers/
        │   ├── authController.ts
        │   ├── applicationController.ts
        │   └── aiController.ts
        ├── middleware/
        ├── models/
        │   ├── User.ts
        │   └── Application.ts
        ├── routes/
        ├── services/
        │   └── openaiService.ts   # Groq AI integration
        └── types/
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Groq API Key — free at [console.groq.com](https://console.groq.com)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/job-tracker.git
cd job-tracker
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/job-tracker
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=gsk_your_groq_key_here
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

### 4. Open the app

Go to [http://localhost:5173](http://localhost:5173) in your browser.

---

## How It Works

1. Register or login to your account
2. Click **+ Add Application** on the dashboard
3. Paste any job description into the text area
4. Click **Parse with AI** — fields are auto-filled instantly
5. Review AI-generated resume bullet points
6. Click **Save Application** — card appears under **Applied**
7. Drag cards across columns as your application progresses
8. Click any card to view, edit, or delete it

---

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `PORT` | backend `.env` | Backend server port |
| `MONGO_URI` | backend `.env` | MongoDB connection string |
| `JWT_SECRET` | backend `.env` | Secret key for JWT tokens |
| `GROQ_API_KEY` | backend `.env` | Groq AI API key (free) |
| `CLIENT_URL` | backend `.env` | Frontend URL for CORS |
| `VITE_API_BASE_URL` | frontend `.env` | Backend API base URL |

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Applications
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | Get all applications |
| POST | `/api/applications` | Create new application |
| PUT | `/api/applications/:id` | Update application |
| DELETE | `/api/applications/:id` | Delete application |
| PATCH | `/api/applications/:id/status` | Update status |

### AI
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/parse-jd` | Parse job description |
| POST | `/api/ai/resume-suggestions` | Generate resume bullets |

---

## Screenshots

> Add screenshots of your Kanban board, Add Application modal, and parsed result here.

---

## Author

**Siddharth Yadav**  
M.Tech CSE — IIT Patna  
[GitHub](https://github.com/yourusername) • [LinkedIn](https://linkedin.com/in/yourusername)

---

## License

This project is open source and available under the [MIT License](LICENSE).
