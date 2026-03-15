// Importations
const dotenv = require('dotenv');
dotenv.config(); // Charger les variables d’environnement UNE SEULE FOIS

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Routes
const categorieRouter = require("./routes/categorie.route");
const scategorieRouter = require("./routes/scategorie.route");
const articleRouter = require("./routes/article.route");
const userRouter = require("./routes/user.route");

// =======================
// Middlewares
// =======================

app.use(cors());
app.use(express.json());

// =======================
// Connexion MongoDB
// =======================

mongoose.connect(process.env.DATABASE)
.then(() => {
    console.log("Database Successfully Connected");
})
.catch(err => {
    console.error("Unable to connect to database:", err);
    process.exit(1);
});

// =======================
// Routes API
// =======================

app.use('/api/users', userRouter);
app.use('/api/categories', categorieRouter);
app.use('/api/scategories', scategorieRouter);
app.use('/api/articles', articleRouter);

// =======================
// React Build (Production)
// =======================

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// =======================
// Lancement du serveur
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
});

module.exports = app;