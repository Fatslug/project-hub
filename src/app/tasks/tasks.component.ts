import { Task } from './task.model';
import { TaskService } from './task.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

	tasks: Task[];

	constructor(private taskService: TaskService) { }

	ngOnInit() {
		this.taskService.getAllTasks().then(tasks => {
			this.tasks = tasks;
		});
	}

	searchTasks(searchTerm: string) {
		if (searchTerm) {
			this.taskService.searchTasks(searchTerm).then(tasks => {
				this.tasks = tasks;
			});
		}
	}
}