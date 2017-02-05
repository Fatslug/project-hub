import { TaskService } from './../task.service';
import { Task } from './../task.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-task-details',
	templateUrl: './task-details.component.html',
	styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

	task: Task = new Task();

	taskID: string;

	constructor(
		private taskService: TaskService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.taskID = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : undefined;
		if (this.taskID) {
			this.taskService.getTask(this.taskID).then(task => {
				if (task) {
					this.task = task;
				} else {
					console.log('Task does not exist');
				}
			});
		}
	}

}