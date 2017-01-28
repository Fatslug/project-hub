import { Account } from './account.model';
import { inject } from '@angular/core/testing';
import { AngularFire, FirebaseListObservable, AuthProviders } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

	public loggedIn: boolean;

	private users: FirebaseListObservable<any>;
	private currentUser: Account;

	constructor(public firebase: AngularFire) {
		this.users = this.firebase.database.list('users');
	}

	register() {
		console.log('Registering...');
		this.firebase.auth.login().then(authUser => {
			this.currentUser = authUser.auth.providerData[0];

			this.isRegistered(this.currentUser).then(result => {
				if (result) {
					console.log('User has already been registered');
				} else {
					this.users.push(this.currentUser);
					this.loggedIn = true;
					console.log('User is now registered');
				}
			});
		});
	}

	login() {
		console.log('Logging in...');
		this.firebase.auth.login().then(authUser => {
			this.currentUser = authUser.auth.providerData[0];
			this.isRegistered(this.currentUser).then(result => {
				if (!result) {
					this.logout();
					console.log('User is not registered');
				} else {
					this.loggedIn = true;
				}
			});
		});
	}

	logout() {
		console.log('Logging out...');
		this.firebase.auth.logout();
		this.loggedIn = false;
	}

	isRegistered(user: Account): Promise<boolean> {
		// Use FIRST to unsubscribe after first response from subscription
		return new Promise((resolve, reject) => {
			const userQuery = this.firebase.database.list('users', {
				query: {
					orderByChild: 'uid',
					equalTo: user.uid
				}
			}).first().subscribe((userRef) => {
				if (userRef.length <= 0) {
					resolve(false);
				} else {
					resolve(true);
				}
			});
		});
	}
}
