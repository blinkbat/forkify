

// global app controller

// imports
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';


// global app state:
// - search obj
// - current recipe
// - shopping list obj
// - favorite recipes

const state = {};

// note this async syntax
const controlSearch = async () => {

	// get the query from view
	const query = searchView.getInput();

	// create search obj
	if (query) {
		// add search obj to state
		state.search = new Search(query);

		// prepare the UI
		searchView.clearInput();
		searchView.clearResults();

		// search for recipes - note await method
		await state.search.getResults();

		// render results
		searchView.renderResults( state.search.recipes );

	}

};

document.querySelector( '.search' ).addEventListener( 'submit', event => {
	event.preventDefault();
	controlSearch();
});





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