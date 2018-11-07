

// global app controller

// imports
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';


// global app state:
// - search obj
// - current recipe
// - shopping list obj
// - favorite recipes

const state = {};


/**************************************************/
// SEARCH CONTROLLER
/**************************************************/

// note this async syntax
const controlSearch = async () => {

		// get the query from view
		const query = searchView.getInput();

		// create search obj
		if (query) {
			// add search obj to state
			state.search = new Search( query );

			// prepare the UI
			//searchView.clearInput();
			searchView.clearResults();

			renderLoader( elements.searchRes );

			try {
				// search for recipes - note await method
				await state.search.getResults();

				// render results
				clearLoader();
				searchView.renderResults( state.search.recipes );

			} catch (err) {
				clearLoader(); 
				console.log( err );
				alert("Error processing search. :'(");
			}

		}

};

// control submit functionality for search
document.querySelector( '.search' ).addEventListener( 'submit', event => {
	event.preventDefault();
	controlSearch();
});

// event delegation for pagination
elements.searchResPages.addEventListener( 'click', event => {

	// target closest relative w/ given class
	const button = event.target.closest( '.btn-inline' );

	if (button) {
		// convert dataset.goto to int base10
		const goToPage = parseInt( button.dataset.goto, 10 );
		searchView.clearResults();
		searchView.renderResults( state.search.recipes, goToPage );
	}

});



/**************************************************/
// RECIPE CONTROLLER
/**************************************************/

// note async syntax
const controlRecipe = async () => {

		// pull only the hash str, replace hash with null
		// using hash is good for single page apps!!!
		const id = window.location.hash.replace( '#', '' );

		if (id) {

			// prepare UI for changes
			recipeView.clearRecipe();
			renderLoader( elements.recipe );

			// create new recipe obj
			state.recipe = new Recipe( id );

			try {
				// get recipe data
				await state.recipe.getRecipe();

				// calcTime and calcServings
				state.recipe.calcTime();
				state.recipe.calcServings();

				// parse ingredients
				state.recipe.parseIngredients();

				// render the recipe
				clearLoader();
				recipeView.renderRecipe( state.recipe );

			} catch (err) {
				console.log( err );
				alert("Error processing recipe. :'(");
			}

		}

}



// use hashchange listener to find #id in url bar
// use pageload listener for recipe bookmarking
// turn pageload on/off to conserve API calls
const windowEvents = [ 'hashchange', /*'load'*/ ];
// cycle thru events to attach listeners
windowEvents.forEach( event => window.addEventListener( event, controlRecipe ) );






/*
// some different import methods:

// single import
import str from './models/Search';

// multi import w/ brackets
//import { add, multi, ID } from './views/searchView';

// multi import with * and reassignment
import * as searchView from './views/searchView';
const add 	= searchView.add;
const multi = searchView.multi;
const ID 		= searchView.ID;

console.log(str + " / " + add(2, 3) + " / " + multi(5, 6) + " / "  + ID);
*/