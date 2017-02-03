import { Task } from './../tasks/task.model';
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

	// TODO: Pagination
	getTasksInProject(projectID): Promise<Task[]> {
		return new Promise((resolve, reject) => {
			const projectQuery = this.firebase.database.list('tasks', {
				query: {
					orderByChild: 'projectID',
					equalTo: projectID
				}
			}).first().subscribe(tasks => {
				console.log(tasks);
				resolve(tasks);
			});
		});
	}

}
