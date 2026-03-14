const dotenv = require('dotenv');

dotenv.config();
console.log("ENV TEST =>", process.env.DATABASE);
console.log("PORT TEST =>", process.env.PORT);
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

const categorieRouter = require("./routes/categorie.route");
const scategorieRouter = require("./routes/scategorie.route");
const articleRouter = require("./routes/article.route");
const userRouter = require("./routes/user.route");

// config dotenv
dotenv.config();

// cors
app.use(cors());

// BodyParser
app.use(express.json());

// connexion base de données
mongoose.connect(process.env.DATABASE)
.then(() => {
    console.log("DataBase Successfully Connected");
})
.catch(err => {
    console.log("Unable to connect to database", err);
    process.exit();
});

// route test
app.get("/", (req,res) => {
    res.send("bonjour");
});

// routes API
app.use('/api/users', userRouter);
app.use('/api/categories', categorieRouter);
app.use('/api/scategories', scategorieRouter);
app.use('/api/articles', articleRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

module.exports = app;