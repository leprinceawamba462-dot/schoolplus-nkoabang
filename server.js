const express = require("express");
const path = require("path");

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

/* =========================================================
   SCHOOL+
   Lycée Bilingue de Nkoabang
   Serveur sans SQLite : compatible Vercel
   ========================================================= */

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

/* =========================================================
   UTILISATEURS
   ========================================================= */

const students = new Map();

function createStudent(name, classe) {
  const cleanName = String(name || "").trim();

  if (!cleanName) return null;

  const id =
    "student_" +
    cleanName
      .toLowerCase()
      .replace(/[^a-z0-9àâçéèêëîïôûùüÿñæœ]+/gi, "_")
      .replace(/^_+|_+$/g, "") +
    "_" +
    Date.now();

  const student = {
    id,
    name: cleanName,
    class_name: classe || "6e",
    createdAt: new Date().toISOString(),
    results: []
  };

  students.set(id, student);
  return student;
}

/* =========================================================
   COURS
   ========================================================= */

function lesson({
  id,
  classe,
  subject,
  title,
  objectives,
  definitions,
  course,
  example,
  method,
  conclusion,
  applications,
  correction
}) {
  return {
    id,
    class_name: classe,
    subject,
    title,
    content: `
      <div class="course-content">
        <h4>🎯 Objectifs</h4>
        <p>${objectives}</p>

        <h4>📖 Définitions</h4>
        <p>${definitions}</p>

        <h4>📚 Cours</h4>
        <p>${course}</p>

        <h4>💡 Exemple</h4>
        <p>${example}</p>

        <h4>🧠 Méthode</h4>
        <p>${method}</p>

        <h4>📝 Exercices d'application</h4>
        <ol>
          ${applications.map(x => `<li>${x}</li>`).join("")}
        </ol>

        <h4>✅ Correction</h4>
        <p>${correction}</p>

        <h4>🏁 Conclusion</h4>
        <p>${conclusion}</p>
      </div>
    `,
    objectives,
    definitions,
    course,
    example,
    method,
    conclusion,
    applications,
    correction
  };
}

const lessons = [

/* =========================
   6e
   ========================= */

lesson({
  id: 1,
  classe: "6e",
  subject: "Mathématiques",
  title: "Les nombres entiers naturels",
  objectives:
    "Lire, écrire, comparer et ranger les nombres entiers naturels.",
  definitions:
    "Un nombre entier naturel est un nombre utilisé pour compter : 0, 1, 2, 3, 4, etc.",
  course:
    "Pour comparer deux nombres entiers, on compare d'abord leur nombre de chiffres. Si les deux nombres ont le même nombre de chiffres, on compare les chiffres en partant de la gauche.",
  example:
    "Entre 458 et 523, 523 est plus grand car son chiffre des centaines est 5 alors que celui de 458 est 4.",
  method:
    "Écrire les nombres correctement, compter les chiffres, puis comparer les chiffres de gauche à droite.",
  conclusion:
    "La comparaison des nombres permet de déterminer lequel est plus petit, égal ou plus grand.",
  applications: [
    "Comparer 245 et 198.",
    "Ranger 45, 12, 89 et 31 dans l'ordre croissant.",
    "Écrire en lettres le nombre 706."
  ],
  correction:
    "245 > 198. Ordre croissant : 12, 31, 45, 89. 706 se lit sept cent six."
}),

lesson({
  id: 2,
  classe: "6e",
  subject: "Français",
  title: "Le groupe nominal",
  objectives:
    "Reconnaître le groupe nominal et identifier ses principaux constituants.",
  definitions:
    "Le groupe nominal est un ensemble de mots organisé autour d'un nom.",
  course:
    "Le groupe nominal peut contenir un déterminant, un nom et éventuellement un adjectif qualificatif ou un complément du nom.",
  example:
    "Dans « le petit garçon », « le » est le déterminant, « garçon » est le nom et « petit » est l'adjectif.",
  method:
    "Chercher d'abord le nom principal puis repérer les mots qui l'accompagnent.",
  conclusion:
    "Le groupe nominal permet de préciser une personne, un animal, une chose ou une idée.",
  applications: [
    "Repérer le groupe nominal dans : « La grande maison est blanche. »",
    "Identifier le déterminant dans : « Un élève travaille. »"
  ],
  correction:
    "Dans « La grande maison », le groupe nominal est « La grande maison ». Le déterminant est « Un » dans « Un élève »."
}),

/* =========================
   5e
   ========================= */

lesson({
  id: 3,
  classe: "5e",
  subject: "Mathématiques",
  title: "Les fractions",
  objectives:
    "Comprendre une fraction et effectuer des opérations simples.",
  definitions:
    "Une fraction est une écriture de la forme a/b avec b différent de zéro. a est le numérateur et b le dénominateur.",
  course:
    "Le dénominateur indique en combien de parties égales l'unité est divisée. Le numérateur indique combien de parties sont considérées.",
  example:
    "Dans 3/4, l'unité est divisée en quatre parties et trois parties sont prises.",
  method:
    "Identifier le numérateur et le dénominateur avant toute opération.",
  conclusion:
    "Les fractions permettent de représenter des quantités qui ne sont pas nécessairement entières.",
  applications: [
    "Identifier le numérateur et le dénominateur de 7/9.",
    "Comparer 1/2 et 3/4.",
    "Calculer 2/5 + 1/5."
  ],
  correction:
    "Pour 7/9, le numérateur est 7 et le dénominateur est 9. 3/4 > 1/2. 2/5 + 1/5 = 3/5."
}),

lesson({
  id: 4,
  classe: "5e",
  subject: "Sciences",
  title: "La matière et ses états",
  objectives:
    "Identifier les principaux états physiques de la matière.",
  definitions:
    "La matière peut principalement se présenter sous forme solide, liquide ou gazeuse.",
  course:
    "Un solide possède une forme propre. Un liquide prend la forme du récipient qui le contient. Un gaz occupe l'espace disponible.",
  example:
    "La glace est un solide, l'eau est un liquide et la vapeur d'eau est un gaz.",
  method:
    "Observer la forme, le volume et le comportement de la substance.",
  conclusion:
    "Les propriétés physiques permettent de distinguer les différents états de la matière.",
  applications: [
    "Donner un exemple de solide.",
    "Donner un exemple de liquide.",
    "Donner un exemple de gaz."
  ],
  correction:
    "Solide : pierre. Liquide : eau. Gaz : dioxyde de carbone."
}),

/* =========================
   4e
   ========================= */

lesson({
  id: 5,
  classe: "4e",
  subject: "Mathématiques",
  title: "Les équations du premier degré",
  objectives:
    "Résoudre une équation simple à une inconnue.",
  definitions:
    "Une équation est une égalité contenant une ou plusieurs inconnues.",
  course:
    "Pour résoudre une équation, on effectue des opérations identiques des deux côtés de l'égalité afin d'isoler l'inconnue.",
  example:
    "x + 5 = 12. En soustrayant 5 aux deux membres, on obtient x = 7.",
  method:
    "Simplifier l'équation puis déplacer progressivement les termes pour isoler x.",
  conclusion:
    "La solution d'une équation est la valeur de l'inconnue qui rend l'égalité vraie.",
  applications: [
    "Résoudre x + 8 = 15.",
    "Résoudre x - 4 = 9.",
    "Résoudre 3x = 21."
  ],
  correction:
    "x = 7 dans le premier cas, x = 13 dans le deuxième et x = 7 dans le troisième."
}),

/* =========================
   3e
   ========================= */

lesson({
  id: 6,
  classe: "3e",
  subject: "Mathématiques",
  title: "Le théorème de Pythagore",
  objectives:
    "Utiliser le théorème de Pythagore dans un triangle rectangle.",
  definitions:
    "Dans un triangle rectangle, l'hypoténuse est le côté opposé à l'angle droit.",
  course:
    "Dans un triangle rectangle ABC rectangle en A, BC² = AB² + AC².",
  example:
    "Si AB = 3 cm et AC = 4 cm, alors BC² = 9 + 16 = 25, donc BC = 5 cm.",
  method:
    "Identifier l'angle droit, repérer l'hypoténuse, écrire la formule puis effectuer le calcul.",
  conclusion:
    "Le théorème de Pythagore permet notamment de calculer une longueur inconnue dans un triangle rectangle.",
  applications: [
    "Un triangle rectangle possède deux côtés de 6 cm et 8 cm. Calculer l'hypoténuse.",
    "Vérifier si un triangle de côtés 3, 4 et 5 est rectangle."
  ],
  correction:
    "6² + 8² = 36 + 64 = 100, donc l'hypoténuse mesure 10 cm. Pour 3,4,5 : 3² + 4² = 5², donc le triangle est rectangle."
}),

lesson({
  id: 7,
  classe: "3e",
  subject: "Français",
  title: "Le texte argumentatif",
  objectives:
    "Comprendre et produire un texte qui défend une idée.",
  definitions:
    "Un texte argumentatif présente une thèse et cherche à convaincre le lecteur.",
  course:
    "L'auteur présente généralement une idée principale, des arguments et des exemples permettant de soutenir son point de vue.",
  example:
    "Pour défendre l'idée que la lecture est utile, on peut argumenter qu'elle enrichit le vocabulaire et développe l'imagination.",
  method:
    "Identifier la thèse, rechercher les arguments, puis relever les exemples.",
  conclusion:
    "Un argument doit être clair, logique et accompagné d'éléments qui le rendent convaincant.",
  applications: [
    "Donner deux arguments en faveur de la lecture.",
    "Rédiger cinq lignes pour défendre une idée."
  ],
  correction:
    "Exemples d'arguments : la lecture développe le vocabulaire et améliore la compréhension. Une rédaction correcte doit présenter une idée, des arguments et des exemples."
}),

/* =========================
   2nde
   ========================= */

lesson({
  id: 8,
  classe: "2nde C",
  subject: "Mathématiques",
  title: "Fonctions numériques",
  objectives:
    "Comprendre la notion de fonction et calculer une image.",
  definitions:
    "Une fonction associe à un nombre x un unique nombre noté f(x).",
  course:
    "Pour une fonction f définie par f(x) = 2x + 3, on obtient l'image d'un nombre en remplaçant x par ce nombre.",
  example:
    "f(4) = 2 × 4 + 3 = 11.",
  method:
    "Remplacer l'inconnue par la valeur demandée, respecter les parenthèses puis calculer.",
  conclusion:
    "Une fonction permet de relier une valeur de départ à une valeur d'arrivée.",
  applications: [
    "Calculer f(2) pour f(x)=3x+1.",
    "Calculer f(5) pour f(x)=x²-2."
  ],
  correction:
    "f(2)=7. f(5)=25-2=23."
}),

lesson({
  id: 9,
  classe: "2nde A",
  subject: "Français",
  title: "Les genres littéraires",
  objectives:
    "Reconnaître quelques grands genres littéraires.",
  definitions:
    "Un genre littéraire correspond à une catégorie d'œuvres partageant certaines caractéristiques.",
  course:
    "On distingue notamment le récit, la poésie, le théâtre et les textes argumentatifs.",
  example:
    "Un roman appartient au genre narratif ; une pièce de théâtre est destinée à être représentée.",
  method:
    "Observer la structure, les personnages, la présence de dialogues, les vers ou l'objectif du texte.",
  conclusion:
    "L'identification du genre aide à mieux comprendre les caractéristiques d'une œuvre.",
  applications: [
    "Citer deux genres littéraires.",
    "Donner une caractéristique du théâtre."
  ],
  correction:
    "Deux genres : roman et poésie. Le théâtre comporte notamment des dialogues et des indications scéniques."
}),

/* =========================
   PREMIÈRE
   ========================= */

lesson({
  id: 10,
  classe: "Première C",
  subject: "Mathématiques",
  title: "Dérivation : introduction",
  objectives:
    "Comprendre l'idée de dérivée et son utilisation pour étudier les variations.",
  definitions:
    "La dérivée d'une fonction mesure notamment son taux de variation instantané.",
  course:
    "Pour une fonction dérivable f, la dérivée f' permet d'étudier le sens de variation de f.",
  example:
    "Si f(x)=x², alors f'(x)=2x.",
  method:
    "Identifier la fonction, appliquer la règle de dérivation appropriée puis étudier le signe de la dérivée.",
  conclusion:
    "La dérivée constitue un outil essentiel pour étudier les variations des fonctions.",
  applications: [
    "Dériver f(x)=x².",
    "Dériver f(x)=3x+2.",
    "Déterminer le signe de 2x."
  ],
  correction:
    "Pour x², f'(x)=2x. Pour 3x+2, f'(x)=3. 2x est négatif si x<0, nul si x=0 et positif si x>0."
}),

lesson({
  id: 11,
  classe: "Première D",
  subject: "SVT",
  title: "La cellule : unité du vivant",
  objectives:
    "Comprendre l'organisation générale d'une cellule.",
  definitions:
    "La cellule est l'unité structurale et fonctionnelle fondamentale de nombreux êtres vivants.",
  course:
    "Les cellules peuvent posséder une membrane, un cytoplasme et, chez les cellules eucaryotes, un noyau. Les cellules végétales possèdent notamment une paroi et des chloroplastes.",
  example:
    "Une cellule végétale possède des structures qui lui permettent notamment de réaliser la photosynthèse.",
  method:
    "Identifier les structures sur un schéma puis associer chaque structure à sa fonction.",
  conclusion:
    "L'organisation cellulaire permet d'expliquer de nombreuses fonctions du vivant.",
  applications: [
    "Citer deux structures cellulaires.",
    "Quelle structure contient l'information génétique dans une cellule eucaryote ?"
  ],
  correction:
    "Exemples : membrane et noyau. Le noyau contient l'ADN dans une cellule eucaryote."
}),

/* =========================
   TERMINALE
   ========================= */

lesson({
  id: 12,
  classe: "Terminale C",
  subject: "Mathématiques",
  title: "Suites numériques",
  objectives:
    "Étudier une suite et reconnaître quelques suites classiques.",
  definitions:
    "Une suite numérique est une famille de nombres indexés par des entiers naturels.",
  course:
    "Une suite peut être définie explicitement par son terme général ou par une relation de récurrence.",
  example:
    "Pour u(n)=2n+1, on obtient u(0)=1, u(1)=3 et u(2)=5.",
  method:
    "Identifier la définition de la suite puis calculer les termes demandés.",
  conclusion:
    "Les suites permettent de modéliser des phénomènes évoluant étape par étape.",
  applications: [
    "Calculer u(3) pour u(n)=2n+1.",
    "Calculer u(5) pour u(n)=n²."
  ],
  correction:
    "u(3)=7. u(5)=25."
}),

lesson({
  id: 13,
  classe: "Terminale D",
  subject: "SVT",
  title: "Génétique et transmission des caractères",
  objectives:
    "Comprendre les notions de gène, allèle et transmission des caractères.",
  definitions:
    "Un gène est une portion d'ADN portant une information. Un allèle est une version d'un gène.",
  course:
    "Les caractères héréditaires peuvent être transmis des parents aux descendants par l'intermédiaire des chromosomes.",
  example:
    "Pour un caractère possédant deux allèles, la combinaison reçue des deux parents influence le génotype de l'individu.",
  method:
    "Identifier les allèles des parents, déterminer les gamètes possibles puis établir les combinaisons.",
  conclusion:
    "La génétique permet d'expliquer la transmission et la diversité de nombreux caractères.",
  applications: [
    "Définir un gène.",
    "Définir un allèle.",
    "Expliquer simplement pourquoi un enfant reçoit une partie de son patrimoine génétique de chaque parent."
  ],
  correction:
    "Un gène est une portion d'ADN portant une information. Un allèle est une version d'un gène. L'enfant reçoit des chromosomes de ses deux parents."
}),

lesson({
  id: 14,
  classe: "Terminale A4",
  subject: "Philosophie",
  title: "La liberté",
  objectives:
    "Réfléchir à la notion de liberté et distinguer plusieurs conceptions.",
  definitions:
    "La liberté peut désigner la capacité de choisir et d'agir sans contrainte excessive.",
  course:
    "La réflexion philosophique sur la liberté pose notamment la question du rapport entre choix personnel, contraintes sociales, responsabilités et déterminismes.",
  example:
    "Choisir une orientation scolaire peut sembler libre, mais ce choix peut aussi être influencé par la famille, les ressources et la société.",
  method:
    "Définir les termes du sujet, formuler une problématique, développer plusieurs arguments et conclure avec une réponse nuancée.",
  conclusion:
    "Réfléchir à la liberté demande de distinguer l'absence de contrainte, la capacité de choisir et la responsabilité.",
  applications: [
    "Définir la liberté.",
    "Donner une contrainte pouvant influencer un choix.",
    "Formuler une problématique sur la liberté."
  ],
  correction:
    "Une problématique possible consiste à se demander si être libre signifie simplement pouvoir choisir ou s'il faut également comprendre les contraintes qui influencent nos choix."
})

];

/* =========================================================
   AJOUT AUTOMATIQUE DE CONTENU STRUCTURÉ
   POUR LES AUTRES COMBINAISONS CLASSE/MATIÈRE
   ========================================================= */

let nextLessonId = lessons.length + 1;

for (const classe of classes) {
  for (const subject of subjects) {

    const exists = lessons.some(
      x => x.class_name === classe && x.subject === subject
    );

    if (!exists) {
      lessons.push(
        lesson({
          id: nextLessonId++,
          classe,
          subject,
          title: `${subject} — cours d'introduction`,
          objectives:
            `Comprendre les notions fondamentales de ${subject} adaptées au niveau ${classe}.`,
          definitions:
            `${subject} est une discipline permettant d'acquérir des connaissances, des méthodes de raisonnement et des compétences adaptées au niveau ${classe}.`,
          course:
            `Ce chapitre d'introduction présente les notions essentielles à maîtriser en ${subject}. L'élève doit apprendre le vocabulaire, comprendre les concepts, utiliser les méthodes et savoir appliquer les connaissances dans des situations simples.`,
          example:
            `Exemple : l'élève lit une situation liée à ${subject}, identifie les informations importantes, choisit une méthode et justifie sa réponse.`,
          method:
            `1. Lire attentivement la consigne. 2. Identifier les notions importantes. 3. Choisir la méthode adaptée. 4. Effectuer le travail demandé. 5. Vérifier et justifier la réponse.`,
          conclusion:
            `La maîtrise de ${subject} repose sur la compréhension du cours, l'entraînement régulier, l'application des méthodes et la correction des erreurs.`,
          applications: [
            `Définir une notion importante de ${subject}.`,
            `Donner un exemple lié au chapitre.`,
            `Résoudre ou expliquer une situation simple de ${subject}.`
          ],
          correction:
            `La correction dépend de la situation étudiée. L'élève doit utiliser les définitions, les méthodes du cours et justifier clairement sa réponse.`
        })
      );
    }
  }
}

/* =========================================================
   EXERCICES
   ========================================================= */

const exercises = [
  {
    id: 1,
    class_name: "6e",
    subject: "Mathématiques",
    title: "Comparaison de nombres",
    question: "Compare 456 et 389.",
    answer: "456 > 389",
    explanation: "456 possède un chiffre des centaines égal à 4 contre 3 pour 389."
  },
  {
    id: 2,
    class_name: "5e",
    subject: "Mathématiques",
    title: "Fraction",
    question: "Calcule 2/5 + 1/5.",
    answer: "3/5",
    explanation: "Les dénominateurs sont identiques : on additionne les numérateurs."
  },
  {
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
    title: "Suite numérique",
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
    { id: 1, question: `Question 1 de ${subject}` },
    { id: 2, question: `Question 2 de ${subject}` },
    { id: 3, question: `Question 3 de ${subject}` }
  ]
}));

/* =========================
   API
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

app.post("/api/login", (req, res) => {
  const name = String(
    req.body.name || req.body.username || ""
  ).trim();

  const password = String(req.body.password || "");

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

  const classe =
    req.body.class_name ||
    req.body.className ||
    "6e";

  let student = [...students.values()].find(
    s =>
      s.name.toLowerCase() === name.toLowerCase() &&
      s.class_name === classe
  );

  if (!student) {
    student = createStudent(name, classe);
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

app.get("/api/lessons", (req, res) => {
  const classe =
    req.query.class ||
    req.query.classe ||
    req.query.class_name ||
    "";

  const subject =
    req.query.subject ||
    req.query.matiere ||
    "";

  let result = lessons;

  if (classe) {
    result = result.filter(
      x => x.class_name === classe
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

app.get("/api/exercises", (req, res) => {
  const classe =
    req.query.class ||
    req.query.classe ||
    req.query.class_name ||
    "";

  const subject =
    req.query.subject ||
    req.query.matiere ||
    "";

  let result = exercises;

  if (classe) {
    result = result.filter(
      x => x.class_name === classe
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
    "Envoie-moi l'énoncé complet et je t'expliquerai la méthode étape par étape.";

  if (q.includes("pythagore")) {
    answer =
      "Dans un triangle rectangle, " +
      "hypoténuse² = côté² + côté². " +
      "Identifie d'abord l'angle droit et l'hypoténuse.";
  }

  if (q.includes("fraction")) {
    answer =
      "Pour additionner des fractions de même dénominateur, " +
      "additionne les numérateurs et conserve le dénominateur.";
  }

  if (
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

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(
      `School+ démarré sur http://localhost:${PORT}`
    );
  });
}

module.exports = app;

