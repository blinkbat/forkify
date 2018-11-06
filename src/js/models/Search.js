
// imports
// npm modules don't need a path :)
import axios from 'axios';

import { apiKey, apiStr, cors } from '../config';

// export class
export default class Search {
	// constructor setup
	constructor( query ) {

 		this.query = query;

	}

	// class-based async func syntax
	async getResults() {

		try {
			// note await method
			const result = await axios( `${cors}${apiStr}/search?key=${apiKey}&q=${this.query}` );
			
			this.recipes = result.data.recipes;
			
			//console.log( this.recipes );

		} catch( err ) {
			alert( err );
		}

	}

}

