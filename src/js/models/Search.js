
// imports
// npm modules don't need a path :)
import axios from 'axios';

// export class
export default class Search {
	// constructor setup
	constructor( query ) {

 		this.query = query;

	}

	// class-based async func syntax
	async getResults() {

		const apiKey 		= '4d87aeb6e329c19b56e2705484cbef8a';
		const searchStr = 'https://www.food2fork.com/api/search';
		const cors 			= 'https://cors-anywhere.herokuapp.com/';

		try {
			// note await method
			const result = await axios( `${cors}${searchStr}?key=${apiKey}&q=${this.query}` );
			
			this.recipes = result.data.recipes;
			
			//console.log( this.recipes );

		} catch( err ) {
			alert( err );
		}

	}

}

