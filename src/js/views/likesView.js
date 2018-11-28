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