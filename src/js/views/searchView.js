

// imports 
import { elements } from './base';



// implicit return due to fat arrow func
export const getInput = () => elements.searchInput.value;

export const clearInput = () => { elements.searchInput.value = ''; };

export const clearResults = () => { 
	elements.searchResList.innerHTML = '';
	elements.searchResPages.innerHTML = ''; 
};



const limitRecipeTitle = (title, limit = 17) => {

		// create arr
		const newTitle = [];

		// check initial length
		if (title.length > limit) {
			// split title into str arr
			title.split(' ').reduce( (acc, curr) => {
				// calculate accumulated length plus current length
				if ( acc + curr.length <= limit ) {
					// if it passes, push next word to arr
					newTitle.push( curr );

				}

				return acc + curr.length;

			}, 0);

			// return the result
			return `${ newTitle.join(' ') } ...`;

		}

		return title;
};



const renderRecipe = recipe => {

	const markup = `
			<li>
			  <a class="results__link" href="#${recipe.recipe_id}">
			      <figure class="results__fig">
			          <img src="${recipe.image_url}" alt="${recipe.title}">
			      </figure>
			      <div class="results__data">
			          <h4 class="results__name">${ limitRecipeTitle(recipe.title) }</h4>
			          <p class="results__author">${recipe.publisher}</p>
			      </div>
			  </a>
			</li>
	`;

	elements.searchResList.insertAdjacentHTML( 'beforeend', markup );

};



const createButton = (page, type) => `

	<button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
      <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  </button>

`;



const renderButtons = (page, numResults, resultsPerPage) => {

		const pages = Math.ceil( numResults / resultsPerPage );

		let button;

		if (page === 1 && pages > 1) {
			// button for next pg
			button = createButton( page, 'next' );

		} else if (page < pages) {
			// both buttons
			button = `
				${createButton( page, 'prev' )}
				${createButton( page, 'next' )}
			`;

		} else if (page === pages && pages > 1) {
			// button to go back
			button = createButton( page, 'prev' );

		}

		elements.searchResPages.insertAdjacentHTML( 'afterbegin', button ); 

}



export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {

	// render current results

	// dynamic logic for pagination
	const start = (page - 1) * resultsPerPage;
	const end 	= page * resultsPerPage;

	// will automatically pass current element into function
	recipes.slice( start, end ).forEach( renderRecipe );

	// render buttons
	renderButtons( page, recipes.length, resultsPerPage );

};





