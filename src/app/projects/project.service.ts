import { Project } from './project.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectService {

	$projects: FirebaseListObservable<any>;

	constructor(private firebase: AngularFire) {
		this.$projects = firebase.database.list('projects');

		this.$projects.subscribe(val => {
			console.log(val);
		});
	}

	addProject(project: Project): Promise<boolean> {
		this.$projects.push(project);
		return Promise.resolve(false);
	}

}
