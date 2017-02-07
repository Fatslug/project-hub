import { Project } from './../project.model';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
	selector: 'app-project-card',
	templateUrl: './project-card.component.html',
	styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

	@Input() project = new Project();

	constructor() { }

	ngOnInit() {
	}

}
