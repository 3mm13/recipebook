const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe');
const validator = require('../middleware/validate')

router.get('/', recipeController.getAllRecipes);
router.post('/', validator.addRecipe, recipeController.createRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;