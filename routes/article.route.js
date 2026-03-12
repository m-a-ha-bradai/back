const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const Scategorie = require("../models/scategorie");


// ==========================
// Afficher tous les articles
// ==========================
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ _id: -1 })
      .populate("scategorieID");

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// Pagination
// ==========================
router.get("/pagination", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const total = await Article.countDocuments();

    const articles = await Article.find()
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json({ articles, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// Chercher article par sous-catégorie
// ==========================
router.get("/scat/:scategorieID", async (req, res) => {
  try {
    const articles = await Article.find({
      scategorieID: req.params.scategorieID,
    });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// Chercher article par catégorie
// ==========================
router.get("/cat/:categorieID", async (req, res) => {
  try {
    const sousCategories = await Scategorie.find({
      categorieID: req.params.categorieID,
    });

    const sousCategorieIDs = sousCategories.map((sc) => sc._id);

    const articles = await Article.find({
      scategorieID: { $in: sousCategorieIDs },
    });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// Chercher un article par ID
// ==========================
router.get("/:articleId", async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId)
      .populate("scategorieID");

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: "ID invalide" });
  }
});


// ==========================
// Créer un article
// ==========================
router.post("/", async (req, res) => {
  try {
    // Vérification doublon designation
    const exist = await Article.findOne({
      designation: req.body.designation,
    });

    if (exist) {
      return res.status(400).json({
        message: "Article avec cette designation existe déjà",
      });
    }

    const newArticle = new Article(req.body);
    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ==========================
// Modifier un article
// ==========================
router.put("/:articleId", async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.articleId,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("scategorieID");

    if (!updated) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// ==========================
// Supprimer un article
// ==========================
router.delete("/:articleId", async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(
      req.params.articleId
    );

    if (!deleted) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    res.status(200).json({ message: "Article supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;