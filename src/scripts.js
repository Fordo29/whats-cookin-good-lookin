import './styles.css';
// import './css/index.scss';
import './images/recipe-book.png';
import './images/baking.png';
import './images/like.png';
import apiCalls from './apiCalls';

import Recipe from './classes/Recipe';
import Ingredient from './classes/Ingredient';
import RecipeRepository from './classes/RecipeRepository';
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';

//global variables
let recipeRepo = new RecipeRepository(recipeData);
const recipeClasses = recipeData.map(recipeData => new Recipe(recipeData));
const tags = {
  appetizers: ['antipasti', 'antipasto', 'starter', 'appetizer', 'hor d\'oeuvre', 'dip', 'spread'],
  breakfast: ['breakfast', 'morning meal', 'brunch'],
  lunch: ['lunch', 'brunch', 'main dish', 'salad'],
  dinner: ['dinner', 'main course', 'main dish', 'salad'],
  sides: ['side dish', 'dip'],
  snacks: ['snack', 'dip'],
  condiments: ['condiment', 'sauce']
}

//Query Selectors
const allRecipesBtn = document.getElementById('recipesBtn');
let recipeCardSection = document.getElementById('recipeCardSection');
let recipeImageName = document.getElementById('recipeImageName');
let recipeIngredients = document.getElementById('recipeIngredients');
let ingredientsTitle = document.querySelector('.ingredients-title');
let directionsTitle = document.querySelector('.directions-title');
let recipeDirections = document.getElementById('recipeDirections');
let recipeCost = document.getElementById('recipeCost');
let searchButton = document.getElementById('searchButton');
let searchInput = document.getElementById('searchBar');
let dropDownSearch = document.getElementById('dropDownSearch');
let searchByName = document.getElementById('searchByNameLink');
let searchByIngredient = document.getElementById('searchByIngredientLink');
let filterByAppetizer = document.getElementById('appetizerButton');

// const recipeCard = document.getElementById('${recipe.id}');

//Event Listeners
window.addEventListener('load', displayAllRecipes);
recipeCardSection.addEventListener('click', displayRecipeCard);
allRecipesBtn.addEventListener('click', displayAllRecipes);
searchButton.addEventListener('click', dropDown);
searchByName.addEventListener('click', searchByRecipeName);
searchByIngredient.addEventListener('click', searchByIngredients);
searchInput.addEventListener('keyup', searchRecipes);
filterByAppetizer.addEventListener('click', findAppetizers);


function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function displayAllRecipes() {
  hide(ingredientsTitle);
  hide(directionsTitle);
  recipeCardSection.innerHTML = '';
  recipeClasses.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <div class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </div>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`
  });
}

function displayRecipeCard() {
  recipeImageName.innerHTML = '';
  displayNameAndImage();
  displayIngredients();
  displayDirections();
  displayRecipeCost();
}

function displayNameAndImage() {
  recipeCardSection.innerHTML = '';
  const recipeId = Number(event.target.parentNode.id);
  recipeClasses.forEach((recipe, index) => {
    if (recipe.id === recipeId) {
     return recipeImageName.innerHTML +=
      `<article class="full-recipe">
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
      </article>`
    }
  });
}

function displayIngredients() {
  show(ingredientsTitle);
  const recipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeClasses.find(recipe => recipe.id === recipeId)

  foundRecipe.ingredients.forEach((step, index) => {
      return recipeIngredients.innerHTML +=
      `<article class="full-recipe">
        <ul>
          <li>${step.quantity.amount} ${step.quantity.unit} ${foundRecipe.logIngredients()[index]}</li>
        </ul>
      </article>`
  });
}

function displayDirections() {
  show(directionsTitle);
  const recipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeClasses.find(recipe => recipe.id === recipeId)

  foundRecipe.instructions.forEach((step, index) => {
      return recipeDirections.innerHTML +=
      `<article class="full-recipe">
        <ol>
          <li>${step.number}) ${step.instruction}</li>
        </ol>
      </article>`
  });
}

function displayRecipeCost() {
  const recipeId = Number(event.target.parentNode.id);
  const foundRecipe = recipeClasses.find(recipe => recipe.id === recipeId)
    return recipeCost.innerHTML +=
    `<article class="full-recipe">
      <h4>Total Cost $${foundRecipe.logRecipeCost()}</h4>
    </article>`
}

function searchRecipes() {
  if (searchByName.clicked === true) {
    searchByRecipeName();
  } else if (searchByIngredient.clicked === true) {
    searchByIngredients();
  } else {
    console.log("please make a selection");
  }
}

function searchByIngredients() {
  recipeCardSection.innerHTML = '';
  let userInput = searchInput.value;
  let filteredRecipes = recipeRepo.filterByIngredients(userInput);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <div class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </div>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`
  });
  dropDown();
}

function searchByRecipeName() {
  recipeCardSection.innerHTML = '';
  let userInput = searchInput.value;
  let filteredRecipes = recipeRepo.filterByName(userInput);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <div class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </div>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`
  });
  dropDown();
}

function dropDown() {
  dropDownSearch.classList.toggle('show');
}

function findAppetizers() {
  recipeCardSection.innerHTML = '';
  let userSelection = tags.appetizers;
  let filteredRecipes = recipeRepo.filterByTag(userSelection);
  filteredRecipes.forEach(recipe => {
    return recipeCardSection.innerHTML +=
    `<article class="card" id="${recipe.id}">
      <div class="card-icons">
      <img class="icon" src="images/like.png">
      <img class="icon" src="images/baking.png">
      </div>
      <h3>${recipe.name}</h3>
      <img class="thumbnail-image" src=${recipe.image}>
    </article>`
  });
}
