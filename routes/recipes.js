var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));

/**
 * This path is for searching a recipe
 */
router.get("/search", async (req, res, next) => {
  try {
    const recipeName = req.query.recipeName;
    const cuisine = req.query.cuisine;
    const diet = req.query.diet;
    const intolerance = req.query.intolerance;
    const number = req.query.number || 5;
    const sort = req.query.sort;
    // const sortDirection = req.query.sortDirection;
    const results = await recipes_utils.searchRecipe(recipeName, cuisine, diet, intolerance, number, sort);
    res.send(results);
  } catch (error) {
    next(error);
  }
})

router.get("/random", async (req, res, next) => {
  try {
    const results = await recipes_utils.getRandomRecipes();
    res.send(results);
  } catch (error) {
    next(error);
  }
})

/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

router.get("/fullInforamtion/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getFullRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
