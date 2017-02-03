import { SearchService } from './../search/search.service';
import { Task } from './task.model';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

	tasks: Task[];

	constructor() { }

	ngOnInit() {
	}

	setResults(event) {
		this.tasks = event;
	}
}