// imports
// local
import { elements } from './base';

export const toggleLikeBtn = isLiked => {

	// turnary to determine icon str
	const iconStr = isLiked ? 'icon-heart' : 'icon-heart-outlined';

	// set attribute if liked or not
	document.querySelector( '.recipe__love use' ).setAttribute( 'href', `img/icons.svg#${iconStr}` );

	// icons.svg#icon-heart-outlined

}



export const toggleLikesMenu = numLikes => {

	// toggle like menu visibility w/ turnary
	elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';

}



export const renderLike = like => {

	console.log("Info for this like: " + like);

	// create markup
	const markup = `
		<li>
	      <a class="likes__link" href="#${ like.id }">
	          <figure class="likes__fig">
	              <img src="${ like.image }" alt="${ like.title }">
	          </figure>
	          <div class="likes__data">
	              <h4 class="likes__name">${ like.title }</h4>
	              <p class="likes__author">${ like.author }</p>
	          </div>
	      </a>
	  </li>
	`;

	elements.likesList.insertAdjacentHTML( 'beforeend', markup );

}



export const deleteLike = id => {

	// grab delete btn
	const el = document.querySelector( `.likes__link[href*="#${id}` ).parentElement;

	if( el ) el.parentElement.removeChild( el );

}

















