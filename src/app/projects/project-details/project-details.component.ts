import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './../project.service';
import { Project } from './../project.model';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

	project: Project = new Project();
	projectID: number;

	constructor(
		private projectService: ProjectService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.projectID = this.route.snapshot.params['id'] ? parseInt(this.route.snapshot.params['id'], 10) : undefined;
		if (this.projectID) {
			this.projectService.getProject(this.projectID).then(project => {
				if (project) {
					this.project = project;
				} else {
					console.log('Project does not exist');
				}
			});
		}
	}

}
