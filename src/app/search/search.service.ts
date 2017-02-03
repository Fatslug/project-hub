import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

	$items: FirebaseListObservable<any>;

	constructor(private firebase: AngularFire) {}

	getAllItems(list: string): Promise<any[]> {
		this.$items = this.firebase.database.list(list);
		return new Promise((resolve, reject) => {
			this.$items.first().subscribe(items => {
				resolve(items);
			});
		});
	}

}
