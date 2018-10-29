

// global app controller

// npm modules don't need a path :)
import axios from 'axios';

async function getResults(query) {

	const apiKey 		= '4d87aeb6e329c19b56e2705484cbef8a';
	const searchStr = 'https://www.food2fork.com/api/search';
	const cors 			= 'https://cors-anywhere.herokuapp.com/';

	try {

		const result = await axios(`${cors}${searchStr}?key=${apiKey}&q=${query}`)
		console.log(result.data.recipes[0].title);

	} catch(err) {
		alert(err);
	}

}


getResults('spaghetti');





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