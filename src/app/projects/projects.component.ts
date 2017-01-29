import { Project } from './project.model';
import { ProjectService } from './project.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css'],
	providers: [
		ProjectService
	]
})
export class ProjectsComponent implements OnInit {

	projects: Project[];

	constructor(private projectService: ProjectService) { }

	ngOnInit() {
		this.projectService.getAllProjects().then(projects => {
			this.projects = projects;
		});
	}

}
