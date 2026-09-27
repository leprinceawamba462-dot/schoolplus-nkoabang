const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

const SCHOOL = {
  name: "School+",
  school: "Lycée Bilingue de Nkoabang",
  city: "Nkoabang",
  country: "Cameroun"
};

const PASSWORD = "School2026";

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

const subjects = [
  "Mathématiques",
  "Français",
  "Anglais",
  "Physique",
  "Chimie",
  "SVT",
  "Histoire",
  "Géographie",
  "Informatique",
  "Éducation civique",
  "Philosophie",
  "Espagnol"
];

/* =========================
   ÉLÈVES
   ========================= */

const students = new Map();

function createStudent(name, className) {
  const cleanName = String(name || "").trim();

  if (!cleanName) return null;

  const id =
    "student_" +
    cleanName
      .toLowerCase()
      .replace(/[^a-z0-9àâçéèêëîïôûùüÿñæœ]+/gi, "_") +
    "_" +
    Date.now();

  const student = {
    id,
    name: cleanName,
    class_name: className || "6e",
    results: []
  };

  students.set(id, student);
  return student;
}

/* =========================
   COURS
   ========================= */

function makeLesson(id, className, subject, title, content) {
  return {
    id,
    class_name: className,
    subject,
    title,
    content
  };
}

const lessons = [
  makeLesson(
    1,
    "6e",
    "Mathématiques",
    "Les nombres entiers naturels",
    `
    <h3>🎯 Objectifs</h3>
    <p>Lire, écrire, comparer et ranger les nombres entiers naturels.</p>

    <h3>📖 Définition</h3>
    <p>Les nombres entiers naturels sont les nombres utilisés pour compter :
    0, 1, 2, 3, 4, 5...</p>

    <h3>📚 Cours</h3>
    <p>Pour comparer deux nombres, on regarde d'abord leur nombre de chiffres.
    S'ils ont le même nombre de chiffres, on compare les chiffres de gauche à droite.</p>

    <h3>💡 Exemple</h3>
    <p>523 est supérieur à 458 car 5 centaines est supérieur à 4 centaines.</p>

    <h3>📝 Application</h3>
    <p>Compare 245 et 198.</p>
    <p>Réponse : 245 &gt; 198.</p>
    `
  ),

  makeLesson(
    2,
    "6e",
    "Français",
    "Le groupe nominal",
    `
    <h3>🎯 Objectifs</h3>
    <p>Reconnaître un groupe nominal et ses constituants.</p>

    <h3>📖 Définition</h3>
    <p>Le groupe nominal est organisé autour d'un nom.</p>

    <h3>📚 Cours</h3>
    <p>Il peut contenir un déterminant, un nom, un adjectif et un complément du nom.</p>

    <h3>💡 Exemple</h3>
    <p>Dans « le petit garçon », « le » est le déterminant,
    « garçon » est le nom et « petit » est l'adjectif.</p>

    <h3>📝 Application</h3>
    <p>Repère le groupe nominal dans : « La grande maison est blanche. »</p>
    `
  ),

  makeLesson(
    3,
    "5e",
    "Mathématiques",
    "Les fractions",
    `
    <h3>🎯 Objectifs</h3>
    <p>Comprendre et utiliser les fractions.</p>

    <h3>📖 Définition</h3>
    <p>Une fraction s'écrit a/b avec b différent de zéro.
    a est le numérateur et b le dénominateur.</p>

    <h3>📚 Cours</h3>
    <p>Le dénominateur indique le nombre de parties égales.
    Le numérateur indique le nombre de parties considérées.</p>

    <h3>💡 Exemple</h3>
    <p>Dans 3/4, l'unité est divisée en quatre parties et trois sont prises.</p>

    <h3>📝 Application</h3>
    <p>Calcule 2/5 + 1/5.</p>
    <p>Réponse : 3/5.</p>
    `
  ),

  makeLesson(
    4,
    "5e",
    "SVT",
    "Les états de la matière",
    `
    <h3>🎯 Objectifs</h3>
    <p>Identifier les principaux états physiques de la matière.</p>

    <h3>📚 Cours</h3>
    <p>La matière peut être solide, liquide ou gazeuse.</p>

    <h3>💡 Exemples</h3>
    <p>Glace : solide.</p>
    <p>Eau : liquide.</p>
    <p>Vapeur d'eau : gaz.</p>
    `
  ),

  makeLesson(
    5,
    "4e",
    "Mathématiques",
    "Équations du premier degré",
    `
    <h3>🎯 Objectifs</h3>
    <p>Résoudre une équation simple à une inconnue.</p>

    <h3>📖 Définition</h3>
    <p>Une équation est une égalité contenant une inconnue.</p>

    <h3>📚 Méthode</h3>
    <p>On effectue la même opération des deux côtés afin d'isoler l'inconnue.</p>

    <h3>💡 Exemple</h3>
    <p>x + 5 = 12</p>
    <p>x = 12 - 5</p>
    <p>x = 7</p>
    `
  ),

  makeLesson(
    6,
    "3e",
    "Mathématiques",
    "Théorème de Pythagore",
    `
    <h3>🎯 Objectifs</h3>
    <p>Utiliser le théorème de Pythagore.</p>

    <h3>📖 Cours</h3>
    <p>Dans un triangle rectangle, le carré de l'hypoténuse
    est égal à la somme des carrés des deux autres côtés.</p>

    <h3>💡 Exemple</h3>
    <p>3² + 4² = 9 + 16 = 25.</p>
    <p>Donc l'hypoténuse mesure 5 cm.</p>
    `
  ),

  makeLesson(
    7,
    "3e",
    "Français",
    "Le texte argumentatif",
    `
    <h3>🎯 Objectifs</h3>
    <p>Comprendre et produire un texte argumentatif.</p>

    <h3>📚 Cours</h3>
    <p>Un texte argumentatif défend une idée appelée thèse.
    Il utilise des arguments et des exemples.</p>

    <h3>💡 Exemple</h3>
    <p>La lecture est utile car elle enrichit le vocabulaire
    et développe l'imagination.</p>
    `
  ),

  makeLesson(
    8,
    "2nde C",
    "Mathématiques",
    "Fonctions numériques",
    `
    <h3>🎯 Objectifs</h3>
    <p>Comprendre la notion de fonction et calculer une image.</p>

    <h3>📚 Cours</h3>
    <p>Une fonction associe à un nombre x un unique nombre f(x).</p>

    <h3>💡 Exemple</h3>
    <p>Si f(x) = 2x + 3 alors f(4) = 11.</p>
    `
  ),

  makeLesson(
    9,
    "2nde A",
    "Français",
    "Les genres littéraires",
    `
    <h3>🎯 Objectifs</h3>
    <p>Reconnaître différents genres littéraires.</p>

    <h3>📚 Cours</h3>
    <p>On distingue notamment le récit, la poésie,
    le théâtre et le texte argumentatif.</p>
    `
  ),

  makeLesson(
    10,
    "Première C",
    "Mathématiques",
    "Introduction à la dérivation",
    `
    <h3>🎯 Objectifs</h3>
    <p>Comprendre l'idée de dérivée.</p>

    <h3>📚 Cours</h3>
    <p>La dérivée permet notamment d'étudier les variations d'une fonction.</p>

    <h3>💡 Exemple</h3>
    <p>Si f(x) = x², alors f'(x) = 2x.</p>
    `
  ),

  makeLesson(
    11,
    "Première D",
    "SVT",
    "La cellule",
    `
    <h3>🎯 Objectifs</h3>
    <p>Comprendre l'organisation générale d'une cellule.</p>

    <h3>📚 Cours</h3>
    <p>Une cellule peut posséder une membrane, un cytoplasme
    et, chez les cellules eucaryotes, un noyau.</p>
    `
  ),

  makeLesson(
    12,
    "Terminale C",
    "Mathématiques",
    "Suites numériques",
    `
    <h3>🎯 Objectifs</h3>
    <p>Étudier une suite numérique.</p>

    <h3>📚 Cours</h3>
    <p>Une suite est une famille de nombres indexés par des entiers.</p>

    <h3>💡 Exemple</h3>
    <p>Si u(n) = 2n + 1, alors u(4) = 9.</p>
    `
  ),

  makeLesson(
    13,
    "Terminale D",
    "SVT",
    "Génétique",
    `
    <h3>🎯 Objectifs</h3>
    <p>Comprendre les notions de gène et d'allèle.</p>

    <h3>📚 Cours</h3>
    <p>Un gène est une portion d'ADN portant une information.
    Un allèle est une version d'un gène.</p>
    `
  ),

  makeLesson(
    14,
    "Terminale A4",
    "Philosophie",
    "La liberté",
    `
    <h3>🎯 Objectifs</h3>
    <p>Réfléchir à la notion de liberté.</p>

    <h3>📚 Cours</h3>
    <p>La liberté peut être étudiée à travers le choix,
    les contraintes, la responsabilité et les déterminismes.</p>
    `
  )
];

/* =========================
   AJOUT DE COURS POUR TOUTES
   LES CLASSES ET MATIÈRES
   ========================= */

let nextId = 100;

for (const className of classes) {
  for (const subject of subjects) {
    const exists = lessons.some(
      x => x.class_name === className && x.subject === subject
    );

    if (!exists) {
      lessons.push(
        makeLesson(
          nextId++,
          className,
          subject,
          `${subject} - Cours d'introduction`,
          `
          <h3>🎯 Objectifs</h3>
          <p>Comprendre les notions fondamentales de ${subject}
          au niveau ${className}.</p>

          <h3>📖 Définitions</h3>
          <p>Cette partie présente le vocabulaire essentiel de ${subject}.</p>

          <h3>📚 Cours</h3>
          <p>L'élève découvre les notions fondamentales,
          les méthodes de travail et les compétences attendues.</p>

          <h3>💡 Exemple</h3>
          <p>Lire la consigne, identifier les informations,
          choisir une méthode et justifier la réponse.</p>

          <h3>📝 Application</h3>
          <p>Définir une notion importante de ${subject}.</p>
          <p>Donner un exemple.</p>
          <p>Expliquer une situation simple.</p>

          <h3>✅ Correction</h3>
          <p>La réponse doit utiliser les définitions,
          les méthodes et les connaissances du cours.</p>
          `
        )
      );
    }
  }
}

/* =========================
   EXERCICES
   ========================= */

const exercises = [
  {
    id: 1,
    class_name: "6e",
    subject: "Mathématiques",
    title: "Comparaison de nombres",
    question: "Compare 456 et 389.",
    answer: "456 > 389",
    explanation: "456 est supérieur à 389."
  },
  {
    id: 2,
    class_name: "5e",
    subject: "Mathématiques",
    title: "Fraction",
    question: "Calcule 2/5 + 1/5.",
    answer: "3/5",
    explanation: "Les dénominateurs sont identiques."
  },
  {
    id: 3,
    class_name: "4e",
    subject: "Mathématiques",
    title: "Équation",
    question: "Résous x + 7 = 15.",
    answer: "8",
    explanation: "x = 15 - 7 = 8."
  },
  {
    id: 4,
    class_name: "3e",
    subject: "Mathématiques",
    title: "Pythagore",
    question: "Un triangle rectangle possède des côtés de 3 cm et 4 cm. Trouve l'hypoténuse.",
    answer: "5",
    explanation: "3² + 4² = 25, donc l'hypoténuse mesure 5 cm."
  },
  {
    id: 5,
    class_name: "2nde C",
    subject: "Mathématiques",
    title: "Fonction",
    question: "Pour f(x)=2x+1, calcule f(5).",
    answer: "11",
    explanation: "f(5)=2×5+1=11."
  },
  {
    id: 6,
    class_name: "Terminale C",
    subject: "Mathématiques",
    title: "Suite",
    question: "Pour u(n)=2n+1, calcule u(4).",
    answer: "9",
    explanation: "u(4)=2×4+1=9."
  }
];

/* =========================
   ÉVALUATIONS
   ========================= */

const evaluations = subjects.map((subject, index) => ({
  id: index + 1,
  subject,
  title: `Évaluation de ${subject}`,
  duration: 30,
  questions: [
    {
      id: 1,
      question: `Question 1 de ${subject}`
    },
    {
      id: 2,
      question: `Question 2 de ${subject}`
    },
    {
      id: 3,
      question: `Question 3 de ${subject}`
    }
  ]
}));

/* =========================
   API INFORMATIONS
   ========================= */

app.get("/api/info", (req, res) => {
  res.json({
    success: true,
    school: SCHOOL,
    classes,
    subjects,
    totalLessons: lessons.length,
    totalExercises: exercises.length
  });
});

/* =========================
   CONNEXION
   ========================= */

app.post("/api/login", (req, res) => {
  const name = String(
    req.body.name || req.body.username || ""
  ).trim();

  const password = String(
    req.body.password || ""
  );

  if (!name || !password) {
    return res.status(400).json({
      success: false,
      message: "Nom et mot de passe obligatoires."
    });
  }

  if (password !== PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Mot de passe incorrect."
    });
  }

  const className =
    req.body.class_name ||
    req.body.className ||
    "6e";

  let student = [...students.values()].find(
    s =>
      s.name.toLowerCase() === name.toLowerCase() &&
      s.class_name === className
  );

  if (!student) {
    student = createStudent(name, className);
  }

  res.json({
    success: true,
    user: {
      id: student.id,
      name: student.name,
      class_name: student.class_name
    }
  });
});

/* =========================
   COURS
   ========================= */

app.get("/api/lessons", (req, res) => {
  const className =
    req.query.class ||
    req.query.classe ||
    req.query.class_name ||
    "";

  const subject =
    req.query.subject ||
    req.query.matiere ||
    "";

  let result = lessons;

  if (className) {
    result = result.filter(
      x => x.class_name === className
    );
  }

  if (subject) {
    result = result.filter(
      x => x.subject === subject
    );
  }

  res.json({
    success: true,
    lessons: result
  });
});

app.get("/api/lessons/:id", (req, res) => {
  const item = lessons.find(
    x => String(x.id) === String(req.params.id)
  );

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Cours introuvable."
    });
  }

  res.json({
    success: true,
    lesson: item
  });
});

/* =========================
   EXERCICES
   ========================= */

app.get("/api/exercises", (req, res) => {
  const className =
    req.query.class ||
    req.query.classe ||
    req.query.class_name ||
    "";

  const subject =
    req.query.subject ||
    req.query.matiere ||
    "";

  let result = exercises;

  if (className) {
    result = result.filter(
      x => x.class_name === className
    );
  }

  if (subject) {
    result = result.filter(
      x => x.subject === subject
    );
  }

  res.json({
    success: true,
    exercises: result
  });
});

app.post("/api/exercises/:id/submit", (req, res) => {
  const exercise = exercises.find(
    x => String(x.id) === String(req.params.id)
  );

  if (!exercise) {
    return res.status(404).json({
      success: false,
      message: "Exercice introuvable."
    });
  }

  const answer = String(
    req.body.answer || ""
  ).trim();

  const normalize = value =>
    String(value)
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[.,]/g, "");

  const correct =
    normalize(answer) ===
    normalize(exercise.answer);

  res.json({
    success: true,
    correct,
    message: correct
      ? "🎉 Bonne réponse !"
      : "❌ Réponse incorrecte.",
    correctAnswer: exercise.answer,
    explanation: exercise.explanation
  });
});

/* =========================
   ÉVALUATIONS
   ========================= */

app.get("/api/evaluations", (req, res) => {
  res.json({
    success: true,
    evaluations
  });
});

app.get("/api/evaluations/:id", (req, res) => {
  const evaluation = evaluations.find(
    x => String(x.id) === String(req.params.id)
  );

  if (!evaluation) {
    return res.status(404).json({
      success: false,
      message: "Évaluation introuvable."
    });
  }

  res.json({
    success: true,
    evaluation
  });
});

app.post("/api/evaluations/:id/submit", (req, res) => {
  const evaluation = evaluations.find(
    x => String(x.id) === String(req.params.id)
  );

  if (!evaluation) {
    return res.status(404).json({
      success: false,
      message: "Évaluation introuvable."
    });
  }

  const userId = req.body.userId;
  const score = Number(req.body.score || 0);
  const total = Number(req.body.total || 20);

  if (userId && students.has(userId)) {
    students.get(userId).results.push({
      type: "evaluation",
      evaluationId: evaluation.id,
      subject: evaluation.subject,
      score,
      total,
      date: new Date().toISOString()
    });
  }

  res.json({
    success: true,
    score,
    total
  });
});

/* =========================
   RÉSULTATS
   ========================= */

app.get("/api/results/:userId", (req, res) => {
  const student = students.get(req.params.userId);

  if (!student) {
    return res.json({
      success: true,
      results: []
    });
  }

  res.json({
    success: true,
    student,
    results: student.results
  });
});

/* =========================
   IA
   ========================= */

app.post("/api/ai/help", (req, res) => {
  const question = String(
    req.body.question || ""
  ).trim();

  if (!question) {
    return res.status(400).json({
      success: false,
      message: "Écris ta question."
    });
  }

  const q = question.toLowerCase();

  let answer =
    "Je suis l'assistant pédagogique de School+. " +
    "Envoie l'énoncé complet et je t'expliquerai " +
    "la méthode étape par étape.";

  if (q.includes("pythagore")) {
    answer =
      "Dans un triangle rectangle, " +
      "hypoténuse² = côté² + côté². " +
      "Identifie d'abord l'angle droit et l'hypoténuse.";
  } else if (
    q.includes("fraction")
  ) {
    answer =
      "Pour additionner deux fractions de même dénominateur, " +
      "on additionne les numérateurs et on conserve le dénominateur.";
  } else if (
    q.includes("équation") ||
    q.includes("equation")
  ) {
    answer =
      "Pour résoudre une équation, effectue la même opération " +
      "sur les deux membres afin d'isoler l'inconnue.";
  }

  res.json({
    success: true,
    answer
  });
});

/* =========================
   TEST SERVEUR
   ========================= */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    message: "School+ fonctionne."
  });
});

/* =========================
   SITE WEB
   ========================= */

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

app.use((req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "public",
      "index.html"
    )
  );
});

/* =========================
   DÉMARRAGE
   ========================= */

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(
      `School+ démarré sur le port ${PORT}`
    );
  });
}

module.exports = app;
