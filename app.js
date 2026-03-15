// Importations
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

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
});

// =======================
// Routes API
// =======================

const categorieRouter = require("./routes/categorie.route");
const scategorieRouter = require("./routes/scategorie.route");
const articleRouter = require("./routes/article.route");
const userRouter = require("./routes/user.route");

app.use('/api/users', userRouter);
app.use('/api/categories', categorieRouter);
app.use('/api/scategories', scategorieRouter);
app.use('/api/articles', articleRouter);

// =======================
// Export ONLY (IMPORTANT)
// =======================

module.exports = app;