
import uniqid from 'uniqid';

export default class List {

	constructor() {
		this.items = [];
	}

	addItem( count, unit, ingredient ) {
		const item = {
			// use package for unique IDs
			id: uniqid(),
			count,
			unit,
			ingredient
		}

		this.items.push( item );
		return item;
	}

	deleteItem( id ) {

		// determine id match
		const index = this.items.findIndex( item => item.id === id );

		// splice is like slice but it mutates original arr
		// also treats args slightly differently
		this.items.splice( index, 1 );
	}

	updateCount( id, newCount ) {
		this.items.find( item => item.id === id ).count = newCount;
	}

}