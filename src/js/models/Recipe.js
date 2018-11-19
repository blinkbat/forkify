
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
			this.time = periods * 15;
		}

		calcServings() {
			this.servings = 4;
		}

		parseIngredients() {

			// note that plurals must come first to avoid replacing singular
			// string within plural, ie "ounces" -> "ozs"
			const unitsLong 	= [ 
														'tablespoons', 'tablespoon', 
														'ounces', 'ounce',
														'teaspoons', 'teaspoon',
														'cups', 'pounds' 
													];

			const unitsShort 	= [ 
														'tbsp', 'tbsp', 
														'oz', 'oz',
														'tsp', 'tsp', 
														'cup', 'pound'
													];

			// take unitsShort out of nested arr, import
			const units = [ ...unitsShort, 'kg', 'g' ];

			const newIngredients = this.ingredients.map( item => {

				// uniform units
				let ingredient = item.toLowerCase();

				unitsLong.forEach( (unit, i) => {

					ingredient = ingredient.replace( unit, unitsShort[i] );

				});

				// remove parentheses, insert space
				ingredient = ingredient.replace(/(\[.*?\]|\(.*?\)) */g, ' ');

				// parse into count, unit, ingredient
				const ingredientArr = ingredient.split(' ');
				// find the index of the arr value that is present in unitsShort. useful!
				const unitIndex			= ingredientArr.findIndex( val => units.includes(val) );
				let ingredientObj;

				if ( unitIndex > -1 ) {

						// unit is present
						// for "4 1/2 cups", arrCount will be ['4', '1/2']
						const arrCount = ingredientArr.slice( 0, unitIndex );
						let count;

						if ( arrCount.length === 1 ) {
							count = eval( ingredientArr[0].replace( '-', '+' ) );
						} else {
							count = eval( ingredientArr.slice( 0, unitIndex ).join( '+' ) );
						}

						ingredientObj = {
							count,
							unit: ingredientArr[ unitIndex ],
							ingredient: ingredientArr.slice( unitIndex + 1 ).join(' ')
						}


				} else if ( parseInt( ingredientArr[0], 10 ) ) {

						// no unit but first element is number
						ingredientObj = {
								count: parseInt( ingredientArr[0], 10 ),
								unit: '',
								ingredient: ingredientArr.slice(1).join(' ')
						}

				} else if ( unitIndex === -1 ) {

						// no unit present
						ingredientObj = {
								count: 1,
								unit: '',
								ingredient
						}

				}


				// return parsed ingredient! necessary for .map method
				return ingredientObj;

			});

			this.ingredients = newIngredients;

		}

		updateServings( type ) {

			// servings
			// if type is decrease, servings - 1, else + 1
			const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

			// ingredients
			this.ingredients.forEach( ingredient => {

				// use multiply operator
				ingredient.count *= ( newServings / this.servings );

			});

			this.servings = newServings;

		} 

}








