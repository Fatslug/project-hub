import { Task } from './../tasks/task.model';
import { ProjectsComponent } from './projects.component';
import { Project } from './project.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {

	$projects: FirebaseListObservable<any>;

	constructor(private firebase: AngularFire) {
		this.$projects = firebase.database.list('projects');
	}

	getProject(projectID): Promise<Project> {
		return new Promise((resolve, reject) => {
			const projectQuery = this.firebase.database.list('projects', {
				query: {
					orderByKey: true,
					equalTo: projectID,
					limitToFirst: 1
				}
			}).first().subscribe((projectRef) => {
				if (projectRef.length === 1) {
					resolve(projectRef[0]);
				} else {
					resolve(false);
				}
			});
		});
	}

	addProject(project: Project): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.$projects.push(project).then(result => {
				if (result) {
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	}

	updateProject(projectKey: string, project: Project): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.$projects.update(projectKey, {
				title: project.title,
				description: project.description,
				updatedDate: project.updatedDate,
				deliveryDate: project.deliveryDate
			}).then(result => {
				resolve(true);
			}).catch((error) => {
				console.log(error);
			});
		});
	}

}
