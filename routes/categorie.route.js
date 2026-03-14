const express = require('express');
const router = express.Router();
const Categorie = require('../models/categorie');
const { verifyToken } = require('../middleware/verifyToken');
const { authorizeRoles } = require('../middleware/authorizeRoles');
// Create a new category
router.post('/',verifyToken,authorizeRoles("admin","Super admin"),async (req, res) => {
try {
const newcat=new Categorie({
    nomcategorie:req.body.nomcategorie,
    imagecategorie:req.body.imagecategorie      
})
newcat.save()
res.status(201).json(newcat)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})
// Get all categories
router.get('/', async (req, res) => {
try {
const categories = await Categorie.find();
res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
})
// Get a category by ID
router.get('/:id', async (req, res) => {
try {
    const cat = await Categorie.findById(req.params.id);
if (!cat) {
return res.status(404).json({ message: 'Categorie not found' }); 
}
res.status(200).json(cat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
})  
// Update a category by ID
router.put('/:id', async (req, res) => {
try{
const cat1 = await Categorie.findByIdAndUpdate(req.params.id, {
    nomcategorie:req.body.nomcategorie,
    imagecategorie:req.body.imagecategorie                      
}   , { new: true });
if (!cat1) {
return res.status(404).json({ message: 'Categorie not found' });                    
}
res.status(200).json(cat1);       
} catch (err) {
res.status(400).json({ message: err.message });     
}   
})
// Delete a category by ID  
router.delete('/:id',verifyToken, async (req, res) => {
try {
const cat2 = await Categorie.findByIdAndDelete(req.params.id);      
if (!cat2) {    
return res.status(404).json({ message: 'Categorie not found' });
}
res.status(200).json({ message: 'Categorie deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }       
        
})
module.exports = router;