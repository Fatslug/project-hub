import { AngularFire } from 'angularfire2';
import { AccountService } from './account/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(
		private account: AccountService,
		private router: Router,
		private firebase: AngularFire
	) {
	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.account.isLoggedIn().then(loggedIn => {
			if (loggedIn) {
				console.log('Logged in, good to go');
				return true;
			} else {
				console.log('Not logged in, rejected');
				this.router.navigate(['/home']);
				return false;
			}
		});
	}

}