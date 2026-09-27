import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// DONNÉES SCHOOL+
// ===============================

const users = [
  { id: 1, username: "eleve", password: "1234", role: "eleve", name: "Élève", class_name: "3e" },
  { id: 2, username: "prof", password: "1234", role: "prof", name: "Professeur", class_name: "" },
  { id: 3, username: "admin", password: "1234", role: "admin", name: "Administrateur", class_name: "" },
  { id: 4, username: "parent", password: "1234", role: "parent", name: "Parent", class_name: "3e" }
];

const subjects = [
  { id: 1, name: "Mathématiques" },
  { id: 2, name: "Français" },
  { id: 3, name: "Anglais" },
  { id: 4, name: "Physique-Chimie" },
  { id: 5, name: "SVT" },
  { id: 6, name: "Histoire-Géographie" },
  { id: 7, name: "Philosophie" }
];

const lessons = [
  {
    id: 1,
    title: "Les équations du premier degré",
    content: "Une équation du premier degré permet de trouver une valeur inconnue. Exemple : 2x + 4 = 10, donc 2x = 6 et x = 3.",
    subject_id: 1,
    subject_name: "Mathématiques",
    class_name: "3e"
  },
  {
    id: 2,
    title: "Les fractions",
    content: "Pour additionner deux fractions, on les réduit au même dénominateur puis on additionne les numérateurs.",
    subject_id: 1,
    subject_name: "Mathématiques",
    class_name: "3e"
  },
  {
    id: 3,
    title: "Le complément circonstanciel",
    content: "Le complément circonstanciel précise les circonstances de l'action : lieu, temps, manière, cause, but, etc.",
    subject_id: 2,
    subject_name: "Français",
    class_name: "3e"
  },
  {
    id: 4,
    title: "Les temps du récit",
    content: "Dans un récit, l'imparfait sert souvent à décrire ou présenter une action habituelle tandis que le passé simple raconte les actions principales.",
    subject_id: 2,
    subject_name: "Français",
    class_name: "3e"
  }
];

const exercises = [
  {
    id: 1,
    title: "Équation simple",
    question: "Résous : 2x + 4 =
