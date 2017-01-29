import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Task } from './task.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService {

	$tasks: FirebaseListObservable<any>;

	constructor(private firebase: AngularFire) {
	}

	getTask(projectKey, taskID): Promise<Task> {
		return new Promise((resolve, reject) => {
			const projectQuery = this.firebase.database.list('tasks/' + projectKey, {
				query: {
					orderByChild: 'id',
					equalTo: taskID
				}
			}).first().subscribe((taskRef) => {
				if (taskRef.length === 1) {
					resolve(taskRef);
				} else {
					resolve(false);
				}
			});
		});
	}

	addTask(projectKey: string, task: Task): Promise<boolean> {
		this.$tasks = this.firebase.database.list('tasks/' + projectKey);
		return new Promise((resolve, reject) => {
			this.$tasks.push(task).then(result => {
				if (result) {
					resolve(true);
				} else {
					resolve(false);
				}
			}).catch(error => {
				console.log('Error: ', error);
			});
		});
	}

	updateTask(taskKey: string, task: Task): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.$tasks.update(taskKey, {
				id: task.id,
				title: task.title,
				description: task.description
			}).then(result => {
				resolve(true);
			}).catch((error) => {
				console.log(error);
			});
		});
	}

}
