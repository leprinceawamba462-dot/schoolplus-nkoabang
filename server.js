import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* =====================================================
   ⚙️ CONFIGURATION SCHOOL+
   ===================================================== */

// 🔐 CHANGE ICI LE MOT DE PASSE COMMUN DES ÉLÈVES
const MOT_DE_PASSE_ELEVES = "School2026";

/*
   Tous les élèves utilisent ce même mot de passe.
   Chacun écrit son propre nom.
*/

/* =====================================================
   👨‍🎓 ÉLÈVES
   ===================================================== */

const students = [];

/* =====================================================
   📚 CLASSES
   ===================================================== */

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

/* =====================================================
   📖 MATIÈRES
   ===================================================== */

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

/* =====================================================
   🧰 CRÉATION DES COURS
   ===================================================== */

function createLesson(
  id,
  className,
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
) {
  return {
    id,
    class_name: className,
    subject,
    title,

    content: `
      <div class="course-content">

        <h2>📖 ${title}</h2>

        <h3>🎯 Objectifs</h3>
        <ul>
          ${objectives.map(x => `<li>${x}</li>`).join("")}
        </ul>

        <h3>📚 Définitions</h3>
        <ul>
          ${definitions.map(x => `<li>${x}</li>`).join("")}
        </ul>

        <h3>📖 Cours</h3>
        <p>${course}</p>

        <h3>✏️ Exemple</h3>
        <div class="example">
          ${example}
        </div>

        <h3>🧠 Méthode</h3>
        <ol>
          ${method.map(x => `<li>${x}</li>`).join("")}
        </ol>

        <h3>✅ Conclusion</h3>
        <p>${conclusion}</p>

        <h3>📝 Exercices d'application</h3>
        <ol>
          ${applications.map(x => `<li>${x}</li>`).join("")}
        </ol>

        <h3>✔️ Corrigé</h3>
        <div class="correction">
          ${correction}
        </div>

      </div>
    `
  };
}

/* =====================================================
   📚 COURS
   ===================================================== */

const lessons = [

  /* ================= 6e ================= */

  createLesson(
    1,
    "6e",
    "Mathématiques",
    "Les nombres entiers naturels",
    [
      "Lire et écrire les nombres entiers naturels.",
      "Comparer deux nombres.",
      "Effectuer des opérations."
    ],
    [
      "Un nombre entier naturel est un nombre sans partie décimale.",
      "Un chiffre est un symbole utilisé pour écrire un nombre.",
      "La valeur d'un chiffre dépend de sa position."
    ],
    `
      Les nombres entiers naturels sont utilisés pour compter.
      Ils comprennent notamment 0, 1, 2, 3, 4, 5, etc.
      Un nombre peut être décomposé suivant les unités, dizaines,
      centaines, milliers et autres rangs.
    `,
    `
      Dans 4 582, le chiffre 5 représente 500 car il se trouve
      au rang des centaines.
    `,
    [
      "Écrire correctement le nombre.",
      "Repérer les différents chiffres.",
      "Identifier la position de chaque chiffre.",
      "Effectuer l'opération demandée.",
      "Vérifier le résultat."
    ],
    `
      Pour maîtriser les nombres naturels, il faut connaître la
      valeur de position des chiffres et savoir effectuer les
      opérations élémentaires.
    `,
    [
      "Écris en lettres : 3 405.",
      "Compare 4 582 et 4 528.",
      "Calcule 245 + 378.",
      "Calcule 800 - 275."
    ],
    `
      3 405 = trois mille quatre cent cinq.<br>
      4 582 > 4 528.<br>
      245 + 378 = 623.<br>
      800 - 275 = 525.
    `
  ),

  createLesson(
    2,
    "6e",
    "Français",
    "Le texte narratif",
    [
      "Identifier un texte narratif.",
      "Reconnaître les personnages.",
      "Repérer les événements."
    ],
    [
      "Un récit raconte une histoire.",
      "Un personnage participe à l'action.",
      "Le cadre correspond au lieu et au moment."
    ],
    `
      Un texte narratif raconte une histoire réelle ou imaginaire.
      Il présente généralement des personnages, un lieu, un moment
      et une succession d'événements.
    `,
    `
      « Paul quitta sa maison et se rendit au marché. Sur le chemin,
      il rencontra son ami Jean. »
      Ce passage raconte plusieurs événements successifs.
    `,
    [
      "Repérer les personnages.",
      "Repérer le lieu.",
      "Repérer le moment.",
      "Repérer les événements.",
      "Classer les événements dans l'ordre."
    ],
    `
      Un récit doit présenter les événements de manière suffisamment
      claire pour que le lecteur puisse comprendre l'histoire.
    `,
    [
      "Relève le personnage principal.",
      "Indique le lieu de l'action.",
      "Classe trois événements dans l'ordre."
    ],
    `
      Le personnage principal est celui autour duquel l'histoire
      est principalement organisée.
    `
  ),

  /* ================= 5e ================= */

  createLesson(
    3,
    "5e",
    "Mathématiques",
    "Les fractions",
    [
      "Identifier une fraction.",
      "Lire une fraction.",
      "Comprendre le rôle du numérateur et du dénominateur."
    ],
    [
      "Le numérateur est le nombre situé au-dessus.",
      "Le dénominateur est le nombre situé au-dessous.",
      "Une fraction représente des parts égales."
    ],
    `
      Une fraction permet de représenter une ou plusieurs parties
      égales d'un tout.
    `,
    `
      Dans 3/5, 3 est le numérateur et 5 est le dénominateur.
      Cela signifie trois parts parmi cinq parts égales.
    `,
    [
      "Identifier le numérateur.",
      "Identifier le dénominateur.",
      "Interpréter la fraction.",
      "Comparer lorsque cela est demandé."
    ],
    `
      Les fractions sont utilisées pour représenter des quantités
      qui ne sont pas nécessairement entières.
    `,
    [
      "Donne le numérateur de 7/9.",
      "Donne le dénominateur de 4/11.",
      "Que représente 2/5 ?"
    ],
    `
      Numérateur de 7/9 : 7.<br>
      Dénominateur de 4/11 : 11.<br>
      2/5 représente deux parts parmi cinq parts égales.
    `
  ),

  /* ================= 4e ================= */

  createLesson(
    4,
    "4e",
    "Physique",
    "Les circuits électriques",
    [
      "Identifier les éléments d'un circuit.",
      "Comprendre le rôle du générateur.",
      "Comprendre un circuit fermé."
    ],
    [
      "Le générateur fournit l'énergie électrique.",
      "Le récepteur utilise l'énergie électrique.",
      "Un circuit fermé permet la circulation du courant."
    ],
    `
      Un circuit électrique simple peut comporter une pile,
      une lampe et des fils conducteurs.
      Lorsque le circuit est correctement fermé, la lampe peut
      fonctionner.
    `,
    `
      Une pile reliée à une lampe par deux fils correctement
      connectés forme un circuit fermé.
    `,
    [
      "Identifier les composants.",
      "Vérifier les connexions.",
      "Vérifier que le circuit est fermé.",
      "Observer le fonctionnement."
    ],
    `
      Le fonctionnement d'un circuit dépend notamment de la
      continuité du circuit électrique.
    `,
    [
      "Cite deux éléments d'un circuit.",
      "Quel est le rôle d'une pile ?",
      "Pourquoi une lampe ne s'allume-t-elle pas dans un circuit ouvert ?"
    ],
    `
      Deux éléments : pile et lampe.<br>
      La pile fournit l'énergie électrique.<br>
      Dans un circuit ouvert, le courant ne circule pas.
    `
  ),

  /* ================= 3e ================= */

  createLesson(
    5,
    "3e",
    "Mathématiques",
    "Équations du premier degré",
    [
      "Reconnaître une équation.",
      "Résoudre une équation.",
      "Vérifier une solution."
    ],
    [
      "Une inconnue est le nombre que l'on cherche.",
      "Une solution rend l'égalité vraie.",
      "Une équation contient une égalité."
    ],
    `
      Résoudre une équation consiste à trouver la valeur de
      l'inconnue qui rend l'égalité vraie.
    `,
    `
      x + 5 = 12<br><br>
      x = 12 - 5<br>
      x = 7
    `,
    [
      "Repérer l'inconnue.",
      "Isoler progressivement l'inconnue.",
      "Effectuer la même opération aux deux membres.",
      "Vérifier le résultat."
    ],
    `
      Une équation doit être transformée tout en conservant
      l'équilibre entre les deux membres.
    `,
    [
      "Résous x + 8 = 15.",
      "Résous x - 4 = 10.",
      "Résous 2x = 18."
    ],
    `
      x + 8 = 15 → x = 7.<br>
      x - 4 = 10 → x = 14.<br>
      2x = 18 → x = 9.
    `
  ),

  createLesson(
    6,
    "3e",
    "Français",
    "Les types de phrases",
    [
      "Reconnaître les différents types de phrases.",
      "Comprendre l'intention du locuteur.",
      "Utiliser la ponctuation."
    ],
    [
      "Déclarative : donne une information.",
      "Interrogative : pose une question.",
      "Impérative : donne un ordre ou un conseil.",
      "Exclamative : exprime une émotion."
    ],
    `
      La phrase déclarative informe.
      La phrase interrogative questionne.
      La phrase impérative donne un ordre ou un conseil.
      La phrase exclamative exprime une émotion forte.
    `,
    `
      « Tu viens demain. » → déclarative.<br>
      « Viens-tu demain ? » → interrogative.<br>
      « Viens demain ! » → impérative.
    `,
    [
      "Lire la phrase.",
      "Chercher l'intention.",
      "Observer la ponctuation.",
      "Déterminer le type."
    ],
    `
      Identifier le type d'une phrase permet de mieux comprendre
      l'intention du locuteur.
    `,
    [
      "Quel est le type de : « Où vas-tu ? »",
      "Quel est le type de : « Ferme la porte. »",
      "Quel est le type de : « Quelle belle journée ! »"
    ],
    `
      « Où vas-tu ? » → interrogative.<br>
      « Ferme la porte. » → impérative.<br>
      « Quelle belle journée ! » → exclamative.
    `
  ),

  /* ================= 2nde C ================= */

  createLesson(
    7,
    "2nde C",
    "Mathématiques",
    "Fonctions numériques",
    [
      "Comprendre la notion de fonction.",
      "Calculer une image.",
      "Utiliser une formule."
    ],
    [
      "Une fonction associe une image à un nombre.",
      "L'antécédent est la valeur de départ.",
      "L'image est le résultat obtenu."
    ],
    `
      Une fonction peut être donnée par une formule.
      Par exemple : f(x) = 2x + 1.
    `,
    `
      f(3) = 2 × 3 + 1 = 7.
    `,
    [
      "Écrire la formule.",
      "Remplacer x par la valeur donnée.",
      "Effectuer le calcul.",
      "Présenter l'image."
    ],
    `
      Une fonction permet d'étudier une relation entre deux
      grandeurs numériques.
    `,
    [
      "Calcule f(2) pour f(x)=3x+1.",
      "Calcule f(5) pour f(x)=2x-4.",
      "Calcule f(4) pour f(x)=x²."
    ],
    `
      f(2)=7.<br>
      f(5)=6.<br>
      f(4)=16.
    `
  ),

  /* ================= Première C ================= */

  createLesson(
    8,
    "Première C",
    "Mathématiques",
    "Suites numériques",
    [
      "Comprendre une suite.",
      "Calculer des termes.",
      "Utiliser une relation de récurrence."
    ],
    [
      "Une suite est une succession ordonnée de nombres.",
      "Un terme est un élément de la suite.",
      "Une relation de récurrence permet de calculer un terme à partir du précédent."
    ],
    `
      Une suite numérique peut être définie par son premier terme
      et une relation permettant de calculer les termes suivants.
    `,
    `
      u₀ = 2 et uₙ₊₁ = uₙ + 3.<br>
      Alors u₁ = 5, u₂ = 8 et u₃ = 11.
    `,
    [
      "Identifier le premier terme.",
      "Appliquer la relation.",
      "Calculer les termes successivement.",
      "Vérifier les calculs."
    ],
    `
      L'étude des suites permet de comprendre l'évolution
      d'une quantité suivant une règle donnée.
    `,
    [
      "Si u₀=4 et uₙ₊₁=uₙ+2, calcule u₁.",
      "Calcule ensuite u₂ et u₃."
    ],
    `
      u₁=6.<br>
      u₂=8.<br>
      u₃=10.
    `
  ),

  /* ================= Première D ================= */

  createLesson(
    9,
    "Première D",
    "SVT",
    "La cellule",
    [
      "Définir une cellule.",
      "Identifier ses principales structures.",
      "Comprendre la spécialisation cellulaire."
    ],
    [
      "La cellule est une unité fondamentale du vivant.",
      "Le noyau contient le matériel génétique dans de nombreuses cellules.",
      "Le cytoplasme constitue le milieu interne de la cellule."
    ],
    `
      Les êtres vivants sont constitués de cellules.
      Les cellules peuvent présenter différentes formes et
      différentes fonctions.
    `,
    `
      Une cellule musculaire est spécialisée dans la contraction,
      tandis qu'une cellule nerveuse participe à la transmission
      des messages.
    `,
    [
      "Identifier la structure.",
      "Identifier son rôle.",
      "Comparer différentes cellules.",
      "Relier structure et fonction."
    ],
    `
      Les cellules possèdent des structures adaptées à leurs
      fonctions.
    `,
    [
      "Qu'est-ce qu'une cellule ?",
      "Quel est le rôle du noyau ?",
      "Pourquoi les cellules peuvent-elles être spécialisées ?"
    ],
    `
      La cellule est une unité fondamentale du vivant.<br>
      Le noyau contient le matériel génétique dans de nombreuses
      cellules.<br>
      La spécialisation permet aux cellules d'assurer des fonctions
      particulières.
    `
  ),

  /* ================= Terminale C ================= */

  createLesson(
    10,
    "Terminale C",
    "Mathématiques",
    "Dérivation",
    [
      "Comprendre la dérivée.",
      "Calculer une dérivée simple.",
      "Étudier les variations d'une fonction."
    ],
    [
      "Le nombre dérivé mesure une variation locale.",
      "La fonction dérivée regroupe les nombres dérivés.",
      "Le signe de la dérivée permet d'étudier les variations."
    ],
    `
      La dérivation est un outil important pour étudier le
      comportement d'une fonction.
    `,
    `
      Si f(x)=x², alors f'(x)=2x.
    `,
    [
      "Identifier la fonction.",
      "Appliquer les règles de dérivation.",
      "Simplifier.",
      "Étudier le signe si nécessaire."
    ],
    `
      La dérivée permet notamment d'étudier les variations
      et certains extrema d'une fonction.
    `,
    [
      "Détermine la dérivée de f(x)=3x².",
      "Détermine la dérivée de f(x)=5x+2."
    ],
    `
      f'(x)=6x.<br>
      f'(x)=5.
    `
  ),

  /* ================= Terminale D ================= */

  createLesson(
    11,
    "Terminale D",
    "SVT",
    "Génétique et hérédité",
    [
      "Définir l'hérédité.",
      "Comprendre le rôle des gènes.",
      "Comprendre la transmission génétique."
    ],
    [
      "Un gène porte une information génétique.",
      "Un allèle est une version d'un gène.",
      "L'hérédité correspond à la transmission de caractères."
    ],
    `
      Les caractères héréditaires peuvent être transmis des
      parents aux descendants grâce à l'information génétique.
    `,
    `
      Un même gène peut exister sous différentes versions appelées
      allèles.
    `,
    [
      "Identifier le caractère étudié.",
      "Identifier les informations génétiques.",
      "Identifier les allèles lorsque cela est possible.",
      "Interpréter les résultats."
    ],
    `
      La génétique permet d'étudier la transmission et
      l'expression des caractères biologiques.
    `,
    [
      "Définis un gène.",
      "Définis un allèle.",
      "Explique l'hérédité."
    ],
    `
      Un gène porte une information génétique.<br>
      Un allèle est une version d'un gène.<br>
      L'hérédité correspond à la transmission d'informations
      génétiques entre générations.
    `
  ),

  /* ================= Terminale A4 ================= */

  createLesson(
    12,
    "Terminale A4",
    "Philosophie",
    "La liberté",
    [
      "Définir la liberté.",
      "Identifier les contraintes.",
      "Construire une argumentation."
    ],
    [
      "La liberté désigne notamment la possibilité de choisir et d'agir.",
      "Une contrainte limite une possibilité d'action.",
      "La responsabilité concerne les conséquences de ses actes."
    ],
    `
      La liberté est une notion centrale en philosophie.
      Elle pose notamment la question de savoir si être libre
      signifie pouvoir faire tout ce que l'on veut.
    `,
    `
      Une personne peut disposer de droits mais rencontrer
      certaines contraintes économiques, sociales ou physiques.
    `,
    [
      "Définir les termes.",
      "Identifier le problème.",
      "Présenter plusieurs arguments.",
      "Illustrer avec des exemples.",
      "Construire une conclusion."
    ],
    `
      Une réflexion philosophique doit être organisée et argumentée.
    `,
    [
      "Définis la liberté.",
      "Donne un exemple de contrainte.",
      "Formule une problématique sur la liberté."
    ],
    `
      Exemple de problématique :<br>
      « Être libre signifie-t-il pouvoir faire tout ce que l'on veut ? »
    `
  )

];

/* =====================================================
   ✏️ EXERCICES
   ===================================================== */

const exercises = [
  {
    id: 1,
    class_name: "6e",
    subject: "Mathématiques",
    title: "Addition",
    question: "Calcule : 245 + 378",
    answer: "623"
  },
  {
    id: 2,
    class_name: "5e",
    subject: "Mathématiques",
    title: "Fraction",
    question: "Dans 7/9, quel est le numérateur ?",
    answer: "7"
  },
  {
    id: 3,
    class_name: "4e",
    subject: "Physique",
    title: "Circuit",
    question: "Quel élément fournit l'énergie électrique ?",
    answer: "pile"
  },
  {
    id: 4,
    class_name: "3e",
    subject: "Mathématiques",
    title: "Équation",
    question: "Résous : x + 8 = 15",
    answer: "7"
  },
  {
    id: 5,
    class_name: "2nde C",
    subject: "Mathématiques",
    title: "Fonction",
    question: "Calcule f(2) pour f(x)=3x+1.",
    answer: "7"
  },
  {
    id: 6,
    class_name: "Première C",
    subject: "Mathématiques",
    title: "Suite",
    question: "Si u₀=4 et uₙ₊₁=uₙ+2, calcule u₁.",
    answer: "6"
  },
  {
    id: 7,
    class_name: "Terminale C",
    subject: "Mathématiques",
    title: "Dérivée",
    question: "Quelle est la dérivée de 5x+2 ?",
    answer: "5"
  },
  {
    id: 8,
    class_name: "Terminale D",
    subject: "SVT",
    title: "Génétique",
    question: "Comment appelle-t-on une version d'un gène ?",
    answer: "allèle"
  }
];

/* =====================================================
   📝 ÉVALUATIONS
   ===================================================== */

const evaluations = [
  {
    id: 1,
    class_name: "6e",
    subject: "Mathématiques",
    title: "Évaluation - Nombres",
    duration: "30 minutes",
    questions: [
      {
        question: "Calcule 125 + 275.",
        answer: "400"
      },
      {
        question: "Calcule 800 - 350.",
        answer: "450"
      }
    ]
  },

  {
    id: 2,
    class_name: "3e",
    subject: "Mathématiques",
    title: "Évaluation - Équations",
    duration: "45 minutes",
    questions: [
      {
        question: "Résous x + 5 = 12.",
        answer: 
