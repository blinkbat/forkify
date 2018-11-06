
// imports
// npm modules don't need a path :)
import axios from 'axios';

import { apiKey, apiStr, cors } from '../config';

// export class
export default class Recipe {

		constructor( id ) {
			this.id = id;
		}

		async getRecipe() {
			try {

				const result = await axios( `${cors}${apiStr}/get?key=${apiKey}&rId=${this.id}` );

				this.title 				= result.data.recipe.title;
				this.author				= result.data.recipe.publisher;
				this.image				= result.data.recipe.image_url;
				this.url 					= result.data.recipe.source_url;
				this.ingredients	= result.data.recipe.ingredients;

			} catch ( err ) {

				console.log( err );
				alert("Something went wrong, yo. :(");

			}
		}

		calcTime() {
			// calc 15 min per 3 ingredients - totally arbitrary
			const numIngredients = this.ingredients.length;
			const periods = Math.ceil( numIngredients / 3 );
			const time = periods * 15;
		}

		calcServings() {
			this.servings = 4;
		}

		parseIngredients() {

			// note that plurals must come first to avoid replacing singular
			// string within plural, ie "ounces" -> "ozs"
			const unitsLong 	= [ 'tablespoons', 'tablespoon', 
														'ounces', 'ounce',
														'teaspoons', 'teaspoon',
														'cups', 'pounds' 
													];

			const unitsShort 	= [ 'tbsp', 'tbsp', 
														'oz', 'oz',
														'tsp', 'tsp', 
														'cup', 'pound'
													];

			const newIngredients = this.ingredients.map( item => {

				// uniform units
				let ingredient = item.toLowerCase();

				unitsLong.forEach( (unit, i) => {

					ingredient = ingredient.replace( unit, unitsShort[i] );

				});

				// remove parentheses, insert space
				ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

				// parse into count, unit, ingredient


			});

			this.ingredients = newIngredients;

		} 

}








