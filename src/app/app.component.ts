import { Router } from '@angular/router';
import { AccountService } from './account/account.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(
		private accountService: AccountService,
		private router: Router
		) { }

	logout() {
		this.router.navigate(['/home']);
		this.accountService.logout();
	}

}
