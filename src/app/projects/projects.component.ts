import { SearchService } from './../search/search.service';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

	projects: Project[];
	searchTerm: string;

	constructor(private projectService: ProjectService) { }

	ngOnInit() {
		this.projectService.getAllProjects().then(projects => {
			this.projects = projects;
		});
	}

	setResults(event) {
		this.projects = event;
	}

}
