import { Project } from './../../projects/project.model';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from './../task.service';
import { ProjectService } from './../../projects/project.service';
import { Task } from './../task.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-task-form',
	templateUrl: './task-form.component.html',
	styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

	task: Task = new Task();
	projects: Project[] = [];

	// Form controls
	taskForm: FormGroup;
	projectKeys: string[];
	title: FormControl;
	description: FormControl;

	mode: string = 'new';
	taskID: number;
	projectID: number;
	projectKey: string;

	constructor (
		private taskService: TaskService,
		private projectService: ProjectService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private snackbar: MdSnackBar
	) {
		this.projectService.getAllProjects().then(projects => {
			// Required to build project dropdown
			this.projects = projects;

			// Get URL params
			this.taskID = this.route.snapshot.params['id'] ? parseInt(this.route.snapshot.params['id'], 10) : undefined;
			this.projectID = this.route.snapshot.params['pid'] ? parseInt(this.route.snapshot.params['pid'], 10) : undefined;

			this.projectService.getProjectByTaskID(this.taskID).then(project => {
				console.log(project);
			})

			if (this.taskID && this.projectID) {

				this.projectKey = this.projects.filter(project => project.id === this.projectID).map(project => project.$key)[0];

				// Now get the task with that project key
				this.taskService.getTask(this.projectKey, this.taskID).then(task => {
					if (task) {
						this.mode = 'edit';

						this.task = task;

						this.taskForm.get('title').setValue(this.task.title);
						this.taskForm.get('description').setValue(this.task.description);
						this.taskForm.get('projectKey').setValue(this.projectKey);
					} else {
						console.log('Task does not exist');
					}
				});
			}
		});

		this.taskForm = this.formBuilder.group({
			title: [this.task.title, Validators.required],
			description: [this.task.description, Validators.required],
			projectKey: [this.task.$key, Validators.required]
		});

	}

	ngOnInit() {
	}

	openSnackBar(message: string) {
		const config = new MdSnackBarConfig();
		config.duration = 3000;
		this.snackbar.open(message, null, config);
	}

	addTask(formValues) {
		const projectKey = formValues.projectKey;
		const task: Task[] = [{
			id: this.task.id ? this.task.id : new Date().getTime(),
			title: formValues.title,
			description: formValues.description
		}];

		if (this.mode === 'edit') {
			// task.$key = this.task.$key;
			this.taskService.updateTask(task[0].$key, task[0]).then(result => {
				if (result) {
					this.openSnackBar('Task updated!');
					this.router.navigate(['/tasks']);
				}
			});
		} else {
			// Get project key from array of all projects
			this.taskService.addTask(projectKey, task[0]).then(result => {
				if (result) {
					this.openSnackBar('Task Added!');
					this.router.navigate(['/tasks']);
				}
			});
		}
	}

}
