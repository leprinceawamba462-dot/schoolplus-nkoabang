const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================================================
   SCHOOL+
   Lycée Bilingue de Nkoabang
   Structure pédagogique
   ========================================================= */

const SCHOOL = {
  name: "School+",
  school: "Lycée Bilingue de Nkoabang",
  password: "School2026"
};

/* =========================================================
   CLASSES
   ========================================================= */

const classes = [
  "6e",
  "5e",
  "4e",
  "3e",
  "2nde C",
  "2nde A",
  "Première C",
  "Première A4",
  "Première D",
  "Terminale C",
  "Terminale D",
  "Terminale A4"
];

/* =========================================================
   MATIÈRES
   ========================================================= */

const subjects = {
  "6e": [
    "Français",
    "Mathématiques",
    "Anglais",
    "Histoire",
    "Géographie",
    "SVT",
    "Informatique",
    "Éducation civique"
  ],

  "5e": [
    "Français",
    "Mathématiques",
    "Anglais",
    "Histoire",
    "Géographie",
    "SVT",
    "Informatique",
    "Éducation civique"
  ],

  "4e": [
    "Français",
    "Mathématiques",
    "Anglais",
    "Physique",
    "Chimie",
    "SVT",
    "Histoire",
    "Géographie",
    "Informatique",
    "Éducation civique"
  ],

  "3e": [
    "Français",
    "Mathématiques",
    "Anglais",
    "Physique",
    "Chimie",
    "SVT",
    "Histoire",
    "Géographie",
    "Informatique",
    "Éducation civique"
  ],

  "2nde C": [
    "Français",
    "Anglais",
    "Mathématiques",
    "Physique",
    "Chimie",
    "SVT",
    "Histoire",
    "Géographie",
    "Informatique",
    "Éducation civique"
  ],

  "2nde A": [
    "Français",
    "Anglais",
    "Mathématiques",
    "Histoire",
    "Géographie",
    "SVT",
    "Informatique",
    "Éducation civique",
    "Espagnol"
  ],

  "Première C": [
    "Français",
    "Anglais",
    "Mathématiques",
    "Physique",
    "Chimie",
    "SVT",
    "Histoire",
    "Géographie",
    "Informatique",
    "Éducation civique"
  ],

  "Première D": [
    "Français",
    "Anglais",
    "Mathématiques",
    "Physique",
    "Chimie",
    "SVT",
    "Histoire",
    "Géographie",
    "Informatique",
    "Éducation civique"
  ],

  "Première A4": [
    "Français",
    "Anglais",
    "Mathématiques",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Espagnol",
    "Informatique",
    "Éducation civique"
  ],

  "Terminale C": [
    "Français",
    "Anglais",
    "Mathématiques",
    "Physique",
    "Chimie",
    "SVT",
    "Histoire",
    "Géographie",
    "Informatique",
    "Éducation civique"
  ],

  "Terminale D": [
    "Français",
    "Anglais",
    "Mathématiques",
    "Physique",
    "Chimie",
    "SVT",
    "Histoire",
    "Géographie",
    "Informatique",
    "Éducation civique"
  ],

  "Terminale A4": [
    "Français",
    "Anglais",
    "Mathématiques",
    "Histoire",
    "Géographie",
    "Philosophie",
    "Espagnol",
    "Informatique",
    "Éducation civique"
  ]
};
/* =========================================================
   PROGRAMME
   Structure :
   classe → matière → chapitres → leçons
   ========================================================= */

const curriculum = {};
for (const classe of classes) {
  curriculum[classe] = {};

  for (const matiere of subjects[classe] || []) {
    curriculum[classe][matiere] = {
      chapitres: [],
      lessons: []
    };
  }
}


/* =========================================================
   EXEMPLE DE STRUCTURE DE LEÇONS
   Les contenus officiels seront ajoutés dans cette structure.
   ========================================================= */

function addLesson(
  classe,
  matiere,
  chapitre,
  titre,
  contenu = "",
  objectifs = [],
  exercices = []
) {
  if (!curriculum[classe]) {
    curriculum[classe] = {};
  }

  if (!curriculum[classe][matiere]) {
    curriculum[classe][matiere] = {
      chapitres: [],
      lessons: []
    };
  }

  const data = curriculum[classe][matiere];

  if (!data.chapitres.includes(chapitre)) {
    data.chapitres.push(chapitre);
  }

  data.lessons.push({
    id: `${classe}-${matiere}-${data.lessons.length + 1}`,
    classe,
    matiere,
    chapitre,
    titre,
    contenu,
    objectifs,
    exercices
  });
}

/* =========================================================
   EXEMPLES DE CONTENU
   ========================================================= */

addLesson(
  "6e",
  "Mathématiques",
  "Nombres et calculs",
  "Les nombres entiers",
  "Étude et utilisation des nombres entiers naturels.",
  [
    "Lire et écrire les nombres",
    "Comparer les nombres",
    "Effectuer des opérations"
  ],
  []
);

addLesson(
  "6e",
  "Français",
  "Lecture",
  "Comprendre un texte",
  "Méthodes de compréhension et d'exploitation d'un texte.",
  [
    "Identifier le thème",
    "Repérer les informations importantes"
  ],
  []
);

addLesson(
  "3e",
  "Mathématiques",
  "Calcul numérique",
  "Puissances",
  "Étude des puissances et de leurs propriétés.",
  [
    "Utiliser les propriétés des puissances",
    "Effectuer des calculs"
  ],
  []
);

addLesson(
  "Première C",
  "Mathématiques",
  "Analyse",
  "Fonctions",
  "Étude des fonctions et de leurs propriétés.",
  [
    "Déterminer le domaine",
    "Étudier les variations",
    "Interpréter une représentation graphique"
  ],
  []
);

addLesson(
  "Terminale C",
  "Mathématiques",
  "Analyse",
  "Dérivation",
  "Étude de la dérivation et de ses applications.",
  [
    "Calculer une dérivée",
    "Étudier les variations",
    "Résoudre des problèmes"
  ],
  []
);

/* =========================================================
   ÉLÈVES
   ========================================================= */

const students = [];

/* =========================================================
   EXERCICES
   ========================================================= */

const exercises = [];

/* =========================================================
   RÉPONSES
   ========================================================= */

const answers = [];

/* =========================================================
   RÉSULTATS
   ========================================================= */

const results = [];

/* =========================================================
   CONNEXION
   ========================================================= */

app.post("/api/login", (req, res) => {
  const name = req.body.name || req.body.username;
  const password = req.body.password;

  if (!name || !password) {
    return res.status(400).json({
      success: false,
      message: "Nom et mot de passe obligatoires."
    });
  }

  if (password !== SCHOOL.password) {
    return res.status(401).json({
      success: false,
      message: "Mot de passe incorrect."
    });
  }

  return res.json({
    success: true,
    user: {
      name,
      role: "eleve"
    },
    school: SCHOOL
  });
});

/* =========================================================
   INFORMATIONS SCHOOL+
   ========================================================= */

app.get("/api/school", (req, res) => {
  res.json({
    success: true,
    school: SCHOOL,
    classes,
    subjects
  });
});

/* =========================================================
   CLASSES
   ========================================================= */

app.get("/api/classes", (req, res) => {
  res.json({
    success: true,
    classes
  });
});

/* =========================================================
   MATIÈRES
   ========================================================= */

app.get("/api/subjects", (req, res) => {
  res.json({
    success: true,
    subjects
  });
});

/* =========================================================
   PROGRAMME D'UNE CLASSE
   ========================================================= */

app.get("/api/curriculum/:classe", (req, res) => {
  const classe = decodeURIComponent(req.params.classe);

  if (!classes.includes(classe)) {
    return res.status(404).json({
      success: false,
      message: "Classe introuvable."
    });
  }

  res.json({
    success: true,
    classe,
    curriculum: curriculum[classe]
  });
});

/* =========================================================
   COURS / LEÇONS
   ========================================================= */

app.get("/api/lessons", (req, res) => {
  const classe = req.query.classe;
  const matiere = req.query.matiere;

  let lessons = [];

  if (classe && curriculum[classe]) {
    if (matiere && curriculum[classe][matiere]) {
      lessons = curriculum[classe][matiere].lessons;
    } else {
      for (const subject of subjects) {
        if (curriculum[classe][subject]) {
          lessons.push(...curriculum[classe][subject].lessons);
        }
      }
    }
  } else {
    for (const c of classes) {
      for (const subject of subjects) {
        lessons.push(...curriculum[c][subject].lessons);
      }
    }
  }

  res.json({
    success: true,
    lessons
  });
});

/* =========================================================
   AJOUTER UNE LEÇON — ENSEIGNANT
   ========================================================= */

app.post("/api/lessons", (req, res) => {
  const {
    classe,
    matiere,
    chapitre,
    titre,
    contenu,
    objectifs,
    exercices
  } = req.body;

  if (!classe || !matiere || !chapitre || !titre) {
    return res.status(400).json({
      success: false,
      message: "Classe, matière, chapitre et titre sont obligatoires."
    });
  }

  addLesson(
    classe,
    matiere,
    chapitre,
    titre,
    contenu || "",
    objectifs || [],
    exercices || []
  );

  const lesson =
    curriculum[classe][matiere].lessons[
      curriculum[classe][matiere].lessons.length - 1
    ];

  res.json({
    success: true,
    message: "Leçon ajoutée.",
    lesson
  });
});

/* =========================================================
   EXERCICES
   ========================================================= */

app.get("/api/exercises", (req, res) => {
  const classe = req.query.classe;
  const matiere = req.query.matiere;

  let data = exercises;

  if (classe) {
    data = data.filter(e => e.classe === classe);
  }

  if (matiere) {
    data = data.filter(e => e.matiere === matiere);
  }

  res.json({
    success: true,
    exercises: data
  });
});

/* =========================================================
   AJOUTER UN EXERCICE
   ========================================================= */

app.post("/api/exercises", (req, res) => {
  const exercise = {
    id: exercises.length + 1,
    classe: req.body.classe,
    matiere: req.body.matiere,
    chapitre: req.body.chapitre || "",
    titre: req.body.titre || "Exercice",
    questions: req.body.questions || [],
    duree: Number(req.body.duree) || 30,
    createdAt: new Date().toISOString()
  };

  exercises.push(exercise);

  res.json({
    success: true,
    exercise
  });
});

/* =========================================================
   ENREGISTRER UNE RÉPONSE
   ========================================================= */

app.post("/api/answers", (req, res) => {
  const answer = {
    id: answers.length + 1,
    student: req.body.student,
    classe: req.body.classe,
    exerciseId: req.body.exerciseId,
    questionId: req.body.questionId,
    answer: req.body.answer,
    createdAt: new Date().toISOString()
  };

  answers.push(answer);

  res.json({
    success: true,
    answer
  });
});

/* =========================================================
   RÉSULTATS
   ========================================================= */

app.get("/api/results", (req, res) => {
  const student = req.query.student;

  let data = results;

  if (student) {
    data = data.filter(r => r.student === student);
  }

  res.json({
    success: true,
    results: data
  });
});

/* =========================================================
   ENREGISTRER UN RÉSULTAT
   ========================================================= */

app.post("/api/results", (req, res) => {
  const result = {
    id: results.length + 1,
    student: req.body.student,
    classe: req.body.classe,
    matiere: req.body.matiere,
    exerciseId: req.body.exerciseId,
    score: Number(req.body.score) || 0,
    total: Number(req.body.total) || 20,
    createdAt: new Date().toISOString()
  };

  results.push(result);

  res.json({
    success: true,
    result
  });
});

/* =========================================================
   IA PÉDAGOGIQUE
   ========================================================= */

app.post("/api/ai", (req, res) => {
  const {
    classe,
    matiere,
    question
  } = req.body;

  res.json({
    success: true,
    classe,
    matiere,
    answer:
      `Je suis l'assistant pédagogique de School+. ` +
      `Tu es en ${classe || "classe non précisée"} ` +
      `et tu travailles la matière ${matiere || "non précisée"}. ` +
      `Question reçue : ${question || ""}`
  });
});

/* =========================================================
   SANTÉ DU SERVEUR
   ========================================================= */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    school: SCHOOL.name
  });
});

/* =========================================================
   FICHIERS DU SITE
   ========================================================= */

app.use(express.static(path.join(__dirname, "public")));

/* =========================================================
   PAGE PRINCIPALE
   ========================================================= */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =========================================================
   VERCEL
   ========================================================= */

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`School+ démarré sur le port ${PORT}`);
  });
}

module.exports = app;
