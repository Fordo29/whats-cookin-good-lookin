import ingredientsData from '../data/ingredients';

class Recipe {
  constructor(recipeData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tags = recipeData.tags;
  }

  logIngredients() {
    const ingredientNameArr = this.ingredients.map(ingredient => {
      const ingredientList = ingredientsData.find(ingredientObj => ingredientObj.id === ingredient.id);
      return ingredientList.name;
    });
    return ingredientNameArr;
  }

  logRecipeDirections() {
    return this.instructions;
  }

  logRecipeCost() {
    let totalCost;
    const result = this.ingredients.reduce((acc, currentIng) => {
      let foundId = ingredientsData.find(ingredient => {
        return ingredient.id === currentIng.id;
      });
      totalCost = (currentIng.quantity.amount * foundId.estimatedCostInCents) / 100;
      acc += totalCost;
      return acc;
    }, 0);
    return result.toFixed(2);
  }
}

export default Recipe;
