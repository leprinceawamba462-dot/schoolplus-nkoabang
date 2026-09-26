import express from "express";
import Database from "better-sqlite3";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const db = new Database(path.join(__dirname, "schoolplus.db"));

db.exec(`
CREATE TABLE IF NOT EXISTS users(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 username TEXT UNIQUE NOT NULL,
 password TEXT NOT NULL,
 role TEXT NOT NULL,
 class_name TEXT
);
CREATE TABLE IF NOT EXISTS subjects(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS lessons(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 subject_id INTEGER,
 class_name TEXT,
 title TEXT,
 content TEXT
);
CREATE TABLE IF NOT EXISTS exercises(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 subject_id INTEGER,
 class_name TEXT,
 question TEXT,
 answer TEXT,
 explanation TEXT,
 hint TEXT,
 duration_seconds INTEGER DEFAULT 60
);
CREATE TABLE IF NOT EXISTS results(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 user_id INTEGER,
 exercise_id INTEGER,
 answer TEXT,
 correct INTEGER,
 elapsed_seconds INTEGER,
 created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

const users = [
  ["eleve","1234","student","3e"],
  ["prof","1234","teacher",""],
  ["admin","1234","admin",""],
  ["parent","1234","parent","3e"]
];
const addUser = db.prepare("INSERT OR IGNORE INTO users(username,password,role,class_name) VALUES(?,?,?,?)");
for (const u of users) addUser.run(...u);

const subjects = ["Mathématiques","Français","Anglais","Physique-Chimie","SVT","Histoire-Géographie","Philosophie"];
const addSubject = db.prepare("INSERT OR IGNORE INTO subjects(name) VALUES(?)");
subjects.forEach(s => addSubject.run(s));

const countLessons = db.prepare("SELECT COUNT(*) c FROM lessons").get().c;
if (!countLessons) {
  const math = db.prepare("SELECT id FROM subjects WHERE name='Mathématiques'").get().id;
  const fr = db.prepare("SELECT id FROM subjects WHERE name='Français'").get().id;
  const lessons = [
    [math,"3e","Fonctions et statistiques",`Objectifs : comprendre une fonction et lire des données.
Introduction : une fonction associe à un nombre une autre valeur.
Développement : on identifie la variable, l'image et les représentations (tableau, formule, graphique).
Je retiens : une fonction peut être décrite par une formule, un tableau ou une courbe.
Conclusion : savoir passer d'une représentation à une autre aide à résoudre les problèmes.`],
    [fr,"3e","Comprendre un texte argumentatif",`Objectifs : repérer une thèse, des arguments et des exemples.
Introduction : un texte argumentatif cherche à défendre une idée.
Développement : on repère la thèse, puis les arguments qui la soutiennent et les exemples qui les illustrent.
Je retiens : thèse → arguments → exemples.
Conclusion : une lecture organisée permet de reconstruire le raisonnement de l'auteur.`]
  ];
  const st = db.prepare("INSERT INTO lessons(subject_id,class_name,title,content) VALUES(?,?,?,?)");
  lessons.forEach(x => st.run(...x));
}
const countExercises = db.prepare("SELECT COUNT(*) c FROM exercises").get().c;
if (!countExercises) {
  const math = db.prepare("SELECT id FROM subjects WHERE name='Mathématiques'").get().id;
  const fr = db.prepare("SELECT id FROM subjects WHERE name='Français'").get().id;
  const ex = [
    [math,"3e","Résous l'équation 2x + 6 = 14.","4","Soustrais 6 des deux côtés puis divise par 2.","Commence par isoler 2x.",90],
    [math,"3e","Calcule 15% de 200.","30","15% = 15/100, puis multiplie par 200.","Transforme le pourcentage en fraction.",90],
    [math,"3e","Résous : 3x - 5 = 16.","7","Ajoute 5 puis divise par 3.","Isole d'abord 3x.",90],
    [math,"3e","Développe : 2(x + 4).","2x + 8","Distribue 2 à chaque terme.","Multiplie 2 par x puis par 4.",90],
    [math,"3e","Calcule 7 × 8.","56","Utilise les tables de multiplication.","7 fois 8.",60],
    [math,"3e","Quelle est la racine carrée de 81 ?","9","Cherche le nombre positif dont le carré vaut 81.","9 × 9 = ?",60],
    [math,"3e","Un triangle a des angles de 50° et 60°. Quel est le troisième angle ?","70","La somme des angles d'un triangle vaut 180°.","Fais 180 - 50 - 60.",90],
    [math,"3e","Convertis 2,5 km en mètres.","2500","1 km = 1000 m.","Multiplie par 1000.",60],
    [math,"3e","Calcule la moyenne de 10, 12 et 14.","12","Additionne les trois nombres puis divise par 3.","(10 + 12 + 14) / 3.",90],
    [math,"3e","Si y = 2x + 1, calcule y pour x = 3.","7","Remplace x par 3.","2 × 3 + 1.",90],
    [fr,"3e","Dans « Le travail est important », quelle idée est défendue si le texte affirme ensuite que le travail permet de progresser ?","Le travail est important","Cherche l'idée générale que les arguments cherchent à soutenir.","Quelle idée l'auteur cherche-t-il à faire accepter ?",120],
    [fr,"3e","Dans « Paul mange rapidement », quel est le verbe ?","mange","Cherche le mot qui indique l'action.","Que fait Paul ?",60],
    [fr,"3e","Quel est le pluriel de « cheval » ?","chevaux","C'est un nom en -al qui change au pluriel.","Pense aux mots en -al.",60],
    [fr,"3e","Quel est le contraire de « difficile » ?","facile","Cherche un adjectif de sens opposé.","Quel mot signifie le contraire ?",60],
    [fr,"3e","Dans « Les élèves travaillent », quel est le sujet ?","Les élèves","Le sujet est celui qui fait l'action.","Qui travaille ?",60],
    [fr,"3e","Transforme au futur : « Je travaille. »","Je travaillerai","Le futur simple de travailler à la première personne se termine par -ai.","Commence par le radical travailler-.",90],
    [fr,"3e","Quel type de texte cherche à défendre une opinion ?","argumentatif","Il présente une thèse soutenue par des arguments.","Pense à thèse et arguments.",90],
    [fr,"3e","Dans « parce que », quel rapport logique est exprimé ?","cause","Cette locution introduit une raison.","Pourquoi l'action a-t-elle lieu ?",60],
    [fr,"3e","Quel est le féminin de « heureux » ?","heureuse","Le féminin régulier se forme ici avec -se.","Observe la terminaison.",60],
    [fr,"3e","Dans « Il court très vite », quel mot précise la manière ?","vite","Le mot précise comment il court.","Comment court-il ?",60]
  ];
  const st = db.prepare("INSERT INTO exercises(subject_id,class_name,question,answer,explanation,hint,duration_seconds) VALUES(?,?,?,?,?,?,?)");
  ex.forEach(x => st.run(...x));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/login",(req,res)=>{
  const {username,password}=req.body||{};
  const u=db.prepare("SELECT id,username,role,class_name FROM users WHERE username=? AND password=?").get(username,password);
  if(!u) return res.status(401).json({error:"Identifiants incorrects"});
  res.json(u);
});

app.get("/api/lessons",(req,res)=>{
  const rows=db.prepare(`SELECT lessons.*, subjects.name subject FROM lessons JOIN subjects ON subjects.id=lessons.subject_id ORDER BY lessons.class_name, subjects.name`).all();
  res.json(rows);
});

app.get("/api/exercises",(req,res)=>{
  const rows=db.prepare(`SELECT exercises.*, subjects.name subject FROM exercises JOIN subjects ON subjects.id=exercises.subject_id ORDER BY exercises.class_name, subjects.name`).all();
  res.json(rows.map(({answer,explanation,...x})=>x));
});

app.post("/api/exercises/:id/submit",(req,res)=>{
  const {answer,user_id,elapsed_seconds}=req.body||{};
  const ex=db.prepare("SELECT * FROM exercises WHERE id=?").get(req.params.id);
  if(!ex) return res.status(404).json({error:"Exercice introuvable"});
  const normalize=s=>String(s??"").trim().toLowerCase().replace(/\s+/g," ");
  const correct=normalize(answer)===normalize(ex.answer);
  if(user_id) db.prepare("INSERT INTO results(user_id,exercise_id,answer,correct,elapsed_seconds) VALUES(?,?,?,?,?)")
    .run(user_id,ex.id,String(answer??""),correct?1:0,Number(elapsed_seconds||0));
  res.json({correct, explanation:ex.explanation, expected: correct ? undefined : ex.answer});
});

app.get("/api/results/:userId",(req,res)=>{
  res.json(db.prepare(`SELECT results.*, exercises.question, subjects.name subject
    FROM results JOIN exercises ON exercises.id=results.exercise_id
    JOIN subjects ON subjects.id=exercises.subject_id
    WHERE user_id=? ORDER BY results.created_at DESC`).all(req.params.userId));
});

app.get("/api/users",(req,res)=>{
  const role=req.query.role;
  const rows=role ? db.prepare("SELECT id,username,role,class_name FROM users WHERE role=? ORDER BY username").all(role)
                   : db.prepare("SELECT id,username,role,class_name FROM users ORDER BY role,username").all();
  res.json(rows);
});

app.post("/api/lessons",(req,res)=>{
  const {subject_id,class_name,title,content}=req.body||{};
  if(!subject_id||!class_name||!title||!content) return res.status(400).json({error:"Champs manquants"});
  const r=db.prepare("INSERT INTO lessons(subject_id,class_name,title,content) VALUES(?,?,?,?)").run(subject_id,class_name,title,content);
  res.json({id:r.lastInsertRowid});
});

app.get("/api/subjects",(req,res)=>res.json(db.prepare("SELECT * FROM subjects ORDER BY name").all()));

app.post("/api/ai/help", async (req,res)=>{
  const {question, answer, hint, mode="explain"}=req.body||{};
  if(!question) return res.status(400).json({error:"Question manquante"});
  if(!process.env.OPENAI_API_KEY){
    return res.json({source:"local", text:`Indice : ${hint||"Relis la consigne et identifie d'abord ce que l'on te demande."}\n\nMéthode : décompose le problème en petites étapes. Ne cherche pas directement la réponse : explique d'abord ce que tu sais et la formule ou règle à utiliser.`});
  }
  try {
    const prompt = `Tu es l'assistant pédagogique de School+, pour un élève du secondaire au Cameroun.
Question: ${question}
Réponse de l'élève: ${answer||"(aucune)"}
Indice disponible: ${hint||"(aucun)"}
Mode: ${mode}
Aide l'élève à comprendre. Ne donne pas directement la réponse finale au premier message. Explique une étape à la fois, avec un vocabulaire simple.`;
    const r = await fetch("https://api.openai.com/v1/responses", {
      method:"POST",
      headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},
      body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-5.6-luna",input:prompt})
    });
    const data=await r.json();
    if(!r.ok) return res.status(502).json({error:data.error?.message||"Erreur du service IA"});
    const text=data.output_text || data.output?.flatMap(x=>x.content||[]).map(x=>x.text||"").join("") || "Réponse IA indisponible.";
    res.json({source:"openai",text});
  } catch(e) { res.status(502).json({error:"Impossible de contacter l'IA"}); }
});

app.get("/{*splat}",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
const port=Number(process.env.PORT||3000);
app.listen(port,()=>console.log(`School+ : http://localhost:${port}`));
