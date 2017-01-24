import { Account } from './account.model';
import { inject } from '@angular/core/testing';
import { AngularFire, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

	public loggedIn: boolean;
	users: FirebaseListObservable<any>;
	currentUser: Account;
	userExists: boolean;
	userCheck: any;

	constructor(public firebase: AngularFire) {
		this.firebase.auth.subscribe(auth => {
			this.loggedIn = auth ? true : false;
		});

		this.users = this.firebase.database.list('users');
	}

	register() {
		console.log('Registering...');
		this.firebase.auth.login().then(authUser => {
			this.currentUser = authUser.auth.providerData[0];
			this.users.push(this.currentUser);
		});
	}

	login() {
		console.log('Logging in...');
		this.firebase.auth.login().then(authUser => {
			this.currentUser = authUser.auth.providerData[0];
			// this.isRegistered(this.currentUser);
			const userID = this.firebase.database.object('users').$ref.transaction(userRef => {
				console.log(userRef);
			});
		});
	}

	logout() {
		console.log('Logging out...');
		this.firebase.auth.logout();
	}

	// isRegistered(user: Account): Promise<boolean> {
	// 	this.userCheck = this.firebase.database.list('users', {
	// 		query: {
	// 			orderByChild: 'uid',
	// 			equalTo: user.uid
	// 		}
	// 	}).subscribe(users => {
	// 		console.log('Users Found: ' + users.length);
	// 		if (users.length === 0) {
	// 			this.logout();
	// 			this.userExists = false;
	// 		} else {
	// 			this.userExists = true;
	// 		}
	// 	});

	// 	return Promise.resolve(true);
	// }

	isLoggedIn(): Promise<boolean> {
		console.log('Is logged in?');
		return Promise.resolve(false);
	}
}
