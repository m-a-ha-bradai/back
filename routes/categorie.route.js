var express = require('express');
var router = express.Router();

// Importer le modèle Categorie
const Categorie = require('../models/categorie');

/**
 * Afficher la liste des catégories
 */
router.get('/', async (req, res) => {
  try {
    const categories = await Categorie.find({}, null, { sort: { _id: -1 } });
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 *  Créer une nouvelle catégorie
 */
router.post('/', async (req, res) => {
  try {
    const { nomcategorie, imagecategorie } = req.body;

    const newCategorie = new Categorie({
      nomcategorie,
      imagecategorie
    });

    const savedCategorie = await newCategorie.save();
    return res.status(201).json(savedCategorie);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

/**
 *  Chercher une catégorie par ID
 */
router.get('/:categorieId', async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.categorieId);

    if (!categorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    return res.status(200).json(categorie);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

/**
 * Modifier une catégorie
 */
router.put('/:categorieId', async (req, res) => {
  try {
    const updatedCategorie = await Categorie.findByIdAndUpdate(
      req.params.categorieId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    return res.status(200).json(updatedCategorie);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

/**
 *  Supprimer une catégorie
 */
router.delete('/:categorieId', async (req, res) => {
  try {
    const deletedCategorie = await Categorie.findByIdAndDelete(req.params.categorieId);

    if (!deletedCategorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    return res.status(200).json({ message: "Catégorie supprimée avec succès" });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;