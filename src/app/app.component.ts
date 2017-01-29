// import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { AccountService } from './account/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(
		private accountService: AccountService,
		private router: Router
	) { }

	ngOnInit() {
		this.accountService.isLoggedIn();
	}

	logout() {
		this.router.navigate(['/home']);
		this.accountService.logout();
	}

}
