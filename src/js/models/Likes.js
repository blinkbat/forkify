


export default class Likes {

	constructor() {
		this.likes = [];
	}



	addLike( id, title, author, image ) {

		const like = { id, title, author, image };
		this.likes.push( like );

	}



	deleteLike( id ) {

		// determine id match
		const index = this.likes.findIndex( item => item.id === id );

		// splice is like slice but it mutates original arr
		// also treats args slightly differently
		this.likes.splice( index, 1 );

	}



	isLiked( id ) {

		return this.likes.findIndex( item => item.id === id ) !== -1;

	}



	getNumLikes() {

		return this.likes.length;

	}


}







