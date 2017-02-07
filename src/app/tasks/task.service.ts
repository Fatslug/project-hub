import { ProjectService } from './../projects/project.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Task } from './task.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService {

	$tasks: FirebaseListObservable<any>;
	$projectTasks: FirebaseObjectObservable<any>;

	constructor(
		private firebase: AngularFire,
		private projectService: ProjectService
	) {
		this.$tasks = this.firebase.database.list('tasks');
	}

	getTask(taskID): Promise<Task> {
		return new Promise((resolve, reject) => {
			const projectQuery = this.firebase.database.list('tasks', {
				query: {
					orderByKey: true,
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

	// Push TASK to TASKS list
	// Push TASKID to PROJECT/TASKS list
	addTask(task: Task): Promise<boolean> {
		console.log('Adding task...');
		console.log('Task: ', task);

		return new Promise((resolve, reject) => {
			const taskID = this.$tasks.push(task).then(taskPush => {
				if (taskPush) {

					// Push taskID to project list
					this.$projectTasks = this.firebase.database.object('projects/' + task.projectID + '/tasks/' + taskPush.key);

					this.$projectTasks.$ref.set(true).then(projectsPush => {
						resolve(true);
					});

				} else {
					console.log('Error pushing to tasks list');
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
				projectID: task.projectID,
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
