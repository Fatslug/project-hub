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

	mode: string = 'new';
	formID: number;

	constructor (
		private projectService: ProjectService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute
	) {
		this.formID = this.route.snapshot.params['id'] ? parseInt(this.route.snapshot.params['id'], 10) : undefined;
		if (this.formID) {
			this.projectService.getProject(this.formID).then(project => {
				if (project) {
					this.mode = 'edit';

					this.project = project[0];

					this.projectForm.get('title').setValue(this.project.title);
					this.projectForm.get('description').setValue(this.project.description);
				} else {
					console.log('Project does not exist');
				}
			});
		}

		this.projectForm = this.formBuilder.group({
			title: [this.project.title, Validators.required],
			description: [this.project.description, Validators.required]
		});

	}

	ngOnInit() {
	}

	addProject(formValues) {
		const project: Project = {
			id: this.project.id ? this.project.id : new Date().getTime(),
			title: formValues.title,
			description: formValues.description
		};

		if (this.mode === 'edit') {
			project.$key = this.project.$key;
			this.projectService.updateProject(project.$key, project);
			console.log('Project updated');
		} else {
			this.projectService.addProject(this.project);
			console.log('Project added');
		}
	}

}
