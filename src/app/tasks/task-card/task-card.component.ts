import { ProjectService } from './../../projects/project.service';
import { Task } from './../task.model';
import { Project } from './../../projects/project.model';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
	selector: 'app-task-card',
	templateUrl: './task-card.component.html',
	styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

	@Input() task = new Task();
	project: Project = new Project();

	constructor(private projectService: ProjectService) {
	}

	ngOnInit() {
		this.projectService.getProject(this.task.projectID).then((project) => {
			this.project = project;
		});
	}

}
