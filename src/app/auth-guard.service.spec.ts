import { RouterTestingModule } from '@angular/router/testing';
import { firebaseAuthConfig } from './app.module';
import { firebaseConfig } from './tasks/task.service.spec';
import { AngularFire, AngularFireModule } from 'angularfire2';
import { AccountService } from './account/account.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';

describe('Service: AuthGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
		providers: [
			AuthGuardService,
			AccountService,
			AngularFire
		],
		imports: [
			RouterTestingModule.withRoutes([]),
			AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
		]
		});
	});

	it('should ...', inject([AuthGuardService], (service: AuthGuardService) => {
		expect(service).toBeTruthy();
	}));
});
