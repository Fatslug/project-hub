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
					orderByChild: 'id',
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

	getProjectByTaskID(taskID): Promise<Project> {
		return new Promise((resolve, reject) => {
			const projectQuery = this.firebase.database.list('projects', {
				query: {
					orderByChild: 'tasks',
					equalTo: taskID,
					limitToFirst: 1
				}
			}).first().subscribe((projectRef) => {
				console.log('ProjectRef', projectRef);
				if (projectRef.length === 1) {
					resolve(projectRef[0]);
				} else {
					resolve(false);
				}
			});
		});
	}

	getAllProjects(): Promise<Project[]> {
		return new Promise((resolve, reject) => {
			this.$projects.first().subscribe(project => {
				resolve(project);
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
				description: project.description
			}).then(result => {
				resolve(true);
			}).catch((error) => {
				console.log(error);
			});
		});
	}

	searchProjects(searchTerm: string) {
		const term = searchTerm.toLocaleLowerCase();
		const results: Project[] = [];
		return this.getAllProjects().then(projects => {
			return projects.filter(project => {
				return project.title.toLocaleLowerCase().indexOf(term) > -1;
			});
		});
	}

}
