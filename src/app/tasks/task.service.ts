import { ProjectService } from './../projects/project.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Task } from './task.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService {

	$tasks: FirebaseListObservable<any>;
	$projectTasks: FirebaseListObservable<any>;

	constructor(
		private firebase: AngularFire,
		private projectService: ProjectService
	) {
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
					resolve(taskRef[0]);
				} else {
					resolve(false);
				}
			});
		});
	}

	addTask(projectKey: string, task: Task): Promise<boolean> {
		this.$tasks = this.firebase.database.list('tasks/' + projectKey);
		this.$projectTasks = this.firebase.database.list('projects/' + projectKey + '/tasks');

		console.log('Adding task...');

		return new Promise((resolve, reject) => {
			this.$tasks.push(task).then(result => {
				if (result) {
					this.$projectTasks.push(task.id).then(result => {
						resolve(result);
					});
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
