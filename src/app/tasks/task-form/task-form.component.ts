import { SearchService } from './../../search/search.service';
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
	taskID: string;
	projectID: string;
	projectKey: string;

	constructor (
		private taskService: TaskService,
		private projectService: ProjectService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private snackbar: MdSnackBar,
		private searchService: SearchService
	) {
		// IF taskID is provided, get project by TaskID
		// If no taskID is provided, we don't care about the TaskID

		// For dropdown, return ONLY project Titles and Keys
		this.searchService.getAllItems('projects').then(projects => {
			this.projects = projects;
		});

		this.taskID = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : undefined;
		this.task.projectID = this.route.snapshot.params['pid'] ? this.route.snapshot.params['pid'] : undefined;

		if (this.taskID) {

			// Now get the task with that project key
			this.taskService.getTask(this.taskID).then(task => {
				if (task) {
					this.mode = 'edit';
					this.task = task;

					this.taskForm.get('title').setValue(this.task.title);
					this.taskForm.get('description').setValue(this.task.description);
					this.taskForm.get('projectKey').setValue(this.task.projectID);
				} else {
					console.log('Task does not exist');
				}
			});

		}

		this.taskForm = this.formBuilder.group({
			title: [this.task.title, Validators.required],
			description: [this.task.description, Validators.required],
			projectKey: [this.task.projectID, Validators.required]
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
		if (formValues.projectKey) {
			const task: Task = {
				projectID: projectKey,
				title: formValues.title,
				description: formValues.description
			};

			if (this.mode === 'edit') {
				task.$key = this.task.$key;
				this.taskService.updateTask(task.$key, task).then(result => {
					if (result) {
						this.openSnackBar('Task updated!');
						this.router.navigate(['/tasks']);
					}
				});
			} else {
				this.taskService.addTask(task).then(result => {
					if (result) {
						this.openSnackBar('Task Added!');
						this.router.navigate(['/tasks']);
					}
				});
			}
		} else {
			console.log('No project key provided!');
		}
	}

}
