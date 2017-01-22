import { inject } from '@angular/core/testing';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

	public loggedIn: boolean;

	constructor(public firebase: AngularFire) {
		this.firebase.auth.subscribe(auth => {
			console.log(auth);
			this.loggedIn = auth ? true : false;
		});
	}

	login() {
		console.log('Logging in...');
		this.firebase.auth.login();
	}
	logout() {
		console.log('Logging out...');
		this.firebase.auth.logout();
	}
}
