import { SearchService } from './search.service';
import { ProjectService } from './../projects/project.service';
import { TaskService } from './../tasks/task.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	searchTerm: string;

	@Input() list;
	@Input() searchIn;
	@Input() defaultTerm = '';
	@Output() onResults = new EventEmitter();

	constructor(
		private searchService: SearchService
	) { }

	ngOnInit() {
		this.searchService.getAllItems(this.list).then(items => {
			const filteredItems = items.filter(item => {

				const standardizedItem = this.searchIn === 'projectID' ? item[this.searchIn] : item[this.searchIn].toLocaleLowerCase();
				return standardizedItem.indexOf(this.defaultTerm) > -1;

			});
			this.onResults.emit(filteredItems);
		});
	}

	searchItems(searchTerm: string) {
		if (searchTerm) {
			if (this.defaultTerm !== '') {
				this.searchService.getTasksInProject(this.defaultTerm).then((items) => { // Search for tasks in specific project
					const filteredItems = items.filter(item => {
						return item.title.toLocaleLowerCase().indexOf(searchTerm) > -1;
					});

					this.onResults.emit(filteredItems);
				});
			} else {
				this.searchService.getAllItems(this.list).then(items => { // Search for a term within the title of either project or task
					const filteredItems = items.filter(item => {
						return item.title.toLocaleLowerCase().indexOf(searchTerm) > -1;
					});

					this.onResults.emit(filteredItems);
				});
			}
		}
	}

}
