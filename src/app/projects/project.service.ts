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
			console.log(val);
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

	ngOnDestroy() {
		this.$projectsSubscription.unsubscribe();
	}

}
