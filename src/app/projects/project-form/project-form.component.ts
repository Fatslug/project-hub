import { DatepickerComponent } from './../../datepicker/datepicker.component';
import { Task } from './../../tasks/task.model';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from './../project.service';
import { Project } from './../project.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

	project: Project = new Project();
	tasks: Task[];

	projectForm: FormGroup;
	title: FormControl;
	description: FormControl;

	mode = 'New';
	projectID: string;

	selectedOption;

	constructor (
		private projectService: ProjectService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private snackbar: MdSnackBar,
		public dialog: MdDialog
	) {
		this.projectID = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : undefined;

		if (this.projectID) {
			this.projectService.getProject(this.projectID).then(project => {
				if (project) {

					this.mode = 'Edit';
					this.project = project;
					this.projectForm.get('title').setValue(this.project.title);
					this.projectForm.get('description').setValue(this.project.description);
					this.projectForm.get('duedate').setValue(this.project.description);

				} else {
					console.log('Project does not exist');
				}
			});
		}

		this.projectForm = this.formBuilder.group({
			title: [this.project.title, Validators.required],
			description: [this.project.description, Validators.required],
			duedate: ['', Validators.required]
		});

	}

	ngOnInit() {
	}

	openCalendar() {
		const dialogRef = this.dialog.open(DatepickerComponent);
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				// const resultDate = new Date(result);
				this.projectForm.get('duedate').setValue(result);
			}
		});
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

		if (this.mode === 'Edit') {
			project.$key = this.project.$key;
			project.updatedDate = new Date().getTime();
			console.log('Updating Project... ' + project.updatedDate);
			this.projectService.updateProject(project.$key, project).then(result => {
				if (result) {
					this.openSnackBar('Project updated!');
					this.router.navigate(['/projects']); 
				}
			});
		} else {
			project.createdDate = new Date().getTime();
			console.log('Creating Project... ' + project.createdDate);
			this.projectService.addProject(project).then(result => {
				if (result) {
					this.openSnackBar('Project Added!');
					this.router.navigate(['/projects']);
				}
			});
		}
	}

	setResults(event) {
		this.tasks = event;
	}

}
