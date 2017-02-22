import { Account } from './../../account/account.model';
import { FirebaseListObservable } from 'angularfire2';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	users: Account[];

	constructor() { }

	ngOnInit() {
	}

	setResults(event) {
		this.users = event;
	}

}
