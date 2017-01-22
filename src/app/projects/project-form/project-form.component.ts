import { ProjectService } from './../project.service';
import { Project } from './../project.model';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

	project: Project = new Project();

	constructor(private projectService: ProjectService) {
	}

	ngOnInit() {
	}

}
