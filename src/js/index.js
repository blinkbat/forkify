

// global app controller

// imports
import Search from './models/Search';
import Recipe from './models/Recipe';
import List 	from './models/List';
import Likes 	from './models/Likes';

import * as searchView 	from './views/searchView';
import * as recipeView 	from './views/recipeView';
import * as listView 		from './views/listView';
import * as likesView 	from './views/likesView';

import { elements, renderLoader, clearLoader } from './views/base';


// global app state:
// - search obj
// - current recipe
// - shopping list obj
// - favorite recipes

const state = {};

// testing purposes
// window.state = state;


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

			// highlight search item
			searchView.highlightSelected( id );

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

				recipeView.renderRecipe( 
					state.recipe,
					state.likes.isLiked( id )
				);

			} catch (err) {
				console.log( err );
				alert("Error processing recipe. :'(");
			}

		}

}



/**************************************************/
// LIST CONTROLLER
/**************************************************/

const controlList = () => {

	// create new list if none
	if ( !state.list ) state.list = new List;

	// add each ingredient to list
	state.recipe.ingredients.forEach( item => {

		const listItem = state.list.addItem( item.count, item.unit, item.ingredient );

		listView.renderItem( listItem );

	});

}



// handle delete and update list item events
elements.shopping.addEventListener( 'click', event => {

	// select closest to class, read id from dataset specs
	const id = event.target.closest( '.shopping__item' ).dataset.itemid;

	// handle delete button
	if ( event.target.matches( '.shopping__delete, .shopping__delete *' ) ) {

		// delete item from state
		state.list.deleteItem( id );

		// delete from UI
		listView.deleteItem( id );

	// handle shopping count value buttons
	} else if ( event.target.matches( '.shopping__count-value' ) ) {

		// update state.list
		const value = parseFloat( event.target.value );
		state.list.updateCount( id, value );

	}

});



/**************************************************/
// LIKES CONTROLLER
/**************************************************/



const controlLikes = () => {

	// if no state, create it
	if ( !state.likes ) { state.likes = new Likes(); }

	// assign current id from current recipe
	const currentID = state.recipe.id;

	//console.log("Recipe ID: " + currentID );

	// if user has not liked current recipe
	if ( !state.likes.isLiked( currentID ) ) {
		// add like to state
		const newLike = state.likes.addLike(
			currentID,
			state.recipe.title,
			state.recipe.author,
			state.recipe.image
		);

		//console.log("New like added: ");
		//console.log( state.likes );
		//console.log( newLike );

		// toggle like button
		likesView.toggleLikeBtn( true );

		// add like to UI list
		likesView.renderLike( newLike );

	// if user HAS liked current recipe
	} else {
		// remove like from state
		state.likes.deleteLike( currentID );

		// toggle like btn
		likesView.toggleLikeBtn( false );

		// remove from UI
		likesView.deleteLike( currentID );

	}

	likesView.toggleLikesMenu( state.likes.getNumLikes() );

};


// restore likes from localStorage on pageload
window.addEventListener( 'load', () => {

	// init
	state.likes = new Likes();

	// restore likes
	state.likes.readStorage();

	// toggle btn
	likesView.toggleLikesMenu( state.likes.getNumLikes() );

	// render extant likes
	state.likes.likes.forEach( like => likesView.renderLike( like ) );

});




// use hashchange listener to find #id in url bar
// use pageload listener for recipe bookmarking
// turn pageload on/off to conserve API calls
const windowEvents = [ 'hashchange', /*'load'*/ ];
// cycle thru events to attach listeners
windowEvents.forEach( event => window.addEventListener( event, controlRecipe ) );

// handling recipe serving btn clicks
elements.recipe.addEventListener( 'click', event => {

	// .btn-decrease * = asterisk selector means 'any child'
	if ( event.target.matches( '.btn-decrease, .btn-decrease *' ) ) {
		// decrease clicked
		// only change if more than one serving
		if ( state.recipe.servings > 1 ) {
			state.recipe.updateServings( 'dec' );
			recipeView.updateServingsIngredients( state.recipe );
		}

	} else if ( event.target.matches( '.btn-increase, .btn-increase *' ) ) {
		// increase clicked
		state.recipe.updateServings( 'inc' );
		recipeView.updateServingsIngredients( state.recipe );

		// add ingredients to shopping list
	} else if ( event.target.matches( '.recipe__btn-add, .recipe__btn-add *' ) ) { 
		controlList();

	} else if ( event.target.matches( '.recipe__love, .recipe__love *' ) ) {
		// add to likes list
		controlLikes();

	}

	//console.log( state.recipe );

});


// testing
//window.l = new List();








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


















