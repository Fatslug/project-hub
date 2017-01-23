import { AccountService } from './account/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(private account: AccountService, private router: Router) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.account.loggedIn) {
			return true;
		} else {
			this.router.navigate(['/home']);
			return false;
		}
	}

}