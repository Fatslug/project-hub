import { Project } from './project.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService implements OnDestroy {

	$projects: FirebaseListObservable<any>;
	$projectsSubscription: any;

	constructor(private firebase: AngularFire) {
		this.$projects = firebase.database.list('projects');

		this.$projectsSubscription = this.$projects.subscribe(val => {
			// console.log(val);
		});
	}

	addProject(project: Project): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.$projects.push(project).then(result => {
				if (result) {
					resolve(true);
				} else {
					reject();
				}
			});
		});
	}

	getProject(projectID): Promise<Project> {
		return new Promise((resolve, reject) => {
			const projectQuery = this.firebase.database.list('projects', {
				query: {
					orderByChild: 'id',
					equalTo: projectID
				}
			}).first().subscribe((projectRef) => {
				console.log(projectRef.length);
				if (projectRef.length === 1) {
					resolve(projectRef);
				} else {
					resolve(false);
				}
			});
		});
	}

	ngOnDestroy() {
		this.$projectsSubscription.unsubscribe();
	}

}
