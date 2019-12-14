import ObservableModel from "./ObservableModel";
const ENDPOINT = "http://sunset.nada.kth.se:8080/iprog2/group/4";
const API_KEY = "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 1;
    this.getNumberOfGuests();
    this._menu = [];
    this._currentDish = null;
  }

  /* Set current dish with a specified id  */
  setCurrentDish(id) {
    this._currentDish = id;
    localStorage.setItem("currentDish", id);
  }

  getCurrentDish() {
    return this._currentDish;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    if (num > 0) this._numberOfGuests = num;
    else this._numberOfGuests = 1;
    this.notifyObservers({change: "nrGueasts"});
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  //Returns the dishes that are on the menu for selected type
  getSelectedDishes(type) {
    return this.getAllDishes(type);
  }

  //Returns all the dishes on the menu.
  getFullMenu() {
    return this._menu;
  }

  //Returns all ingredients for all the dishes on the menu.
  getAllIngredients() {
    return this._menu.map(dish => dish.extendedIngredients).flat();
  }

  //Returns the total price of the menu (price per serving of each dish multiplied by number of guests).
  getTotalMenuPrice() {
    return this._menu
      .map(dish => dish.pricePerServing)
      .reduce((acc, price) => acc + price, 0);
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  addDishToMenu(dish) {
    this._menu.push(dish);
    this.notifyObservers({change: "dishAdded"});
  }

  //Removes dish with specified id from menu
  removeDishFromMenu(id) {
    this._menu = this._menu.filter(dish => dish.id != id);
    this.notifyObservers({change: "dishRemoved"});
  }

  // API methods

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }

  //Returns all dishes of specific type (i.e. "starter", "main dish" or "dessert").
  //query argument, text, if passed only returns dishes that contain the query in name or one of the ingredients.
  //if you don't pass any query, all the dishes will be returned
  getAllDishes(type, query) {
    return  fetch(ENDPOINT + "/recipes/search?type=" + (type ? type : "") + "&query=" + (query ? query : ""), {
 	     "method": "GET",
 	     "headers": {"X-Mashape-Key": API_KEY}
     })
    .then(response => {
     return response.json();
     })
     .then(data => {
       //console.log(data);
       return data.results;
     })
     .catch(err => {
        console.log(err);
     });
  }

  //Returns a dish of specific ID
  getDish(id) {
    return fetch(ENDPOINT + "/recipes/" + id + "/information", {
      method: "GET",
      headers: { "X-Mashape-Key": API_KEY }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        //console.log(data.title);
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const dishesConst = [{
  'id': 1,
  'name': 'French toast',
  'dishTypes': ['starter', 'breakfast'],
  'image': 'toast.jpg',
  'instructions': "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
  'pricePerServing': 32.5,
  'extendedIngredients': [{
    'name': 'eggs',
    'amount': 0.5,
    'unit': '',
  }, {
    'name': 'milk',
    'amount': 30,
    'unit': 'ml',
  }, {
    'name': 'brown sugar',
    'amount': 7,
    'unit': 'g',
  }, {
    'name': 'ground nutmeg',
    'amount': 0.5,
    'unit': 'g',
  }, {
    'name': 'white bread',
    'amount': 2,
    'unit': 'slices',
  }]
}, {
  'id': 2,
  'name': 'Sourdough Starter',
  'dishTypes': ['starter'],
  'image': 'sourdough.jpg',
  'instructions': "Here is how you make it... Lore ipsum...",
  'pricePerServing': 43.2,
  'extendedIngredients': [{
    'name': 'active dry yeast',
    'amount': 0.5,
    'unit': 'g',
  }, {
    'name': 'warm water',
    'amount': 30,
    'unit': 'ml',
  }, {
    'name': 'all-purpose flour',
    'amount': 15,
    'unit': 'g',
  }]
}
]

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
