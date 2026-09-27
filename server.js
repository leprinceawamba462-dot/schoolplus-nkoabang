import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const users = [
  {
    id: 1,
    username: "eleve",
    password: "1234",
    role: "eleve",
    name: "Élève",
    class_name: "3e"
  },
  {
    id: 2,
    username: "prof",
    password: "1234",
    role: "prof",
    name: "Professeur",
    class_name: ""
  }
];

const lessons = [
  {
    id: 1,
    title: "Les équations du premier degré",
    content: "2x + 4 = 10 donc x = 3.",
    class_name: "3e"
  },
  {
    id: 2,
    title: "Les fractions",
    content: "Pour additionner des fractions, on utilise un dénominateur commun.",
    class_name: "3e"
  }
];

const exercises = [
  {
    id: 1,
    title: "Équation",
    question: "Résous : 2x + 4 = 10",
    answer: "3",
    class_name: "3e"
  },
  {
    id: 2,
    title: "Calcul",
    question: "Combien font 15 × 4 ?",
    answer: "60",
    class_name: "3e"
  }
];

const results = [];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Nom d'utilisateur ou mot de passe incorrect."
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      class_name: user.class_name
    }
  });
});

app.get("/api/lessons", (req, res) => {
  res.json(lessons);
});

app.get("/api/exercises", (req, res) => {
  res.json(exercises);
});

app.post("/api/exercises/:id/submit", (req, res) => {
  const exercise = exercises.find(
    e => String(e.id) === String(req.params.id)
  );

  if (!exercise) {
    return res.status(404).json({
      success: false,
      message: "Exercice introuvable."
    });
  }

  const answer = String(req.body.answer || "").trim().toLowerCase();

  const correct =
    answer === String(exercise.answer).trim().toLowerCase();

  results.push({
    user_id: Number(req.body.userId) || 0,
    exercise_id: exercise.id,
    correct,
    score: correct ? 1 : 0
  });

  res.json({
    success: true,
    correct,
    score: correct ? 1 : 0
  });
});

app.get("/api/results/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  res.json(results.filter(r => r.user_id === userId));
});

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;

if (!process.env.VERCEL) {
  app.listen(process.env.PORT || 3000, () => {
    console.log("School+ démarré");
  });
    }
