import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from './../project.service';
import { Project } from './../project.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

	project: Project = new Project();

	projectForm: FormGroup;
	title: FormControl;
	description: FormControl;

	mode: string = 'new';
	projectID: string;

	constructor (
		private projectService: ProjectService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private snackbar: MdSnackBar
	) {
		this.projectID = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : undefined;
		console.log(this.projectID);
		if (this.projectID) {
			this.projectService.getProject(this.projectID).then(project => {
				if (project) {
					this.mode = 'edit';

					this.project = project;

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

	openSnackBar(message: string) {
		const config = new MdSnackBarConfig();
		config.duration = 3000;
		this.snackbar.open(message, null, config);
	}

	addProject(formValues) {
		const project: Project = {
			title: formValues.title,
			description: formValues.description
		};

		if (this.mode === 'edit') {
			project.$key = this.project.$key;
			this.projectService.updateProject(project.$key, project).then(result => {
				if (result) {
					this.openSnackBar('Project updated!');
					this.router.navigate(['/projects']);
				}
			});
		} else {
			this.projectService.addProject(project).then(result => {
				if (result) {
					this.openSnackBar('Project Added!');
					this.router.navigate(['/projects']);
				}
			});
		}
	}

}
