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
	@Output() onResults = new EventEmitter();

	constructor(
		private searchService: SearchService
	) { }

	ngOnInit() {
		console.log(this.list);
		this.searchService.getAllItems(this.list).then(items => {
			this.onResults.emit(items);
		});
	}

	searchItems(searchTerm: string) {
		if (searchTerm) {
			this.searchService.getAllItems(this.list).then(items => {
				const filteredItems = items.filter(item => {
					return item.title.toLocaleLowerCase().indexOf(searchTerm) > -1;
				});

				this.onResults.emit(filteredItems);
			});
		}
	}

}
