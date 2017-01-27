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
		let userExists: boolean;
		console.log('Logging in...');
		this.firebase.auth.login().then(authUser => {
			this.currentUser = authUser.auth.providerData[0];

			// Use FIRST to unsubscribe after first response from subscription
			this.firebase.database.list('users', {
				query: {
					orderByChild: 'uid',
					equalTo: this.currentUser.uid
				}
			}).first().subscribe((userRef) => {
				if (userRef.length <= 0) {
					this.logout();
					console.log('User is not registered');
				}
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
