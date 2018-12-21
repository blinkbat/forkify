


export default class Likes {

	constructor() {
		this.likes = [];
	}



	addLike( id, title, author, image ) {

		const like = { id, title, author, image };
		this.likes.push( like );

		// persist data in localStorage
		this.persistData();

		// returning this ended up being extremely important, duh
		return like;

	}



	deleteLike( id ) {

		// determine id match
		const index = this.likes.findIndex( item => item.id === id );

		// splice is like slice but it mutates original arr
		// also treats args slightly differently
		this.likes.splice( index, 1 );

		// persist data in localStorage
		this.persistData();

	}



	isLiked( id ) {

		return this.likes.findIndex( item => item.id === id ) !== -1;

	}



	getNumLikes() {

		return this.likes.length;

	}



	persistData() {

		// set localStorage -- only accepts strings, so convert arr to str
		localStorage.setItem( 'likes', JSON.stringify( this.likes ) );

	}

	readStorage() {

		// save into var, convert back to arr
		const storage = JSON.parse( localStorage.getItem( 'likes' ) );		

		// restoring likes from localStorage
		if( storage ) this.likes = storage;

	}



}







