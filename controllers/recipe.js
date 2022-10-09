const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllRecipes = async (req, res, next) => {
    const result = await mongodb
        .getDb()
        .db()
        .collection('recipe')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({ message: err }) || "There was an error while trying to perform this command. Please try again.";
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lists);
            }

        });
};

const createRecipe = async (req, res) => {
    const recipe = {
        recipeName: req.body.recipeName,
        mealType: req.body.mealType,
        recipeUrl: req.body.recipeUrl,
        tips: req.body.tips,
        tasteRating: req.body.tasteRating,
        difficulty: req.body.difficulty,
        timeNeeded: req.body.timeNeeded
    }
    const response = await mongodb
        .getDb()
        .db()
        .collection('recipe')
        .insertOne(recipe);

    if (response.acknowledged) {
        res.status(201).json(response);
    }
    else {
        res.status(500).json(response.error || 'An error occurred while trying to add an user. Please try again');
    }

};

const deleteRecipe = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
    const response = await mongodb
    .getDb()
    .db()
    .collection('recipe')
    .remove({ _id: recipeId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the recipe.');
    }
  };


module.exports = {
    getAllRecipes,
    createRecipe,
    deleteRecipe
}