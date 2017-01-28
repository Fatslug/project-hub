import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from './../project.service';
import { Project } from './../project.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.css'],
	providers: [
		ProjectService
	]
})
export class ProjectFormComponent implements OnInit {

	project: Project = new Project();

	projectForm: FormGroup;
	title: FormControl;
	description: FormControl;

	formID: number;

	constructor (
		private projectService: ProjectService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute
	) {
		this.formID = parseInt(this.route.snapshot.params['id'], 1) ? this.route.snapshot.params['id'] : undefined;
		console.log(this.formID);

		this.projectForm = this.formBuilder.group({
			title: [this.project.title, Validators.required],
			description: [this.project.description, Validators.required]
		});
	}

	ngOnInit() {
	}

	addProject(formValues) {
		const project: Project = {
			id: undefined,
			title: formValues.title,
			description: formValues.description
		}
		console.log(project);
		// this.projectService.addProject(project);
	}

}
