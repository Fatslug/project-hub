import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
	selector: 'app-task-card',
	templateUrl: './task-card.component.html',
	styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

	@Input() task;

	constructor() { }

	ngOnInit() {
		console.log(this.task);
	}

}
