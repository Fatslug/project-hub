import { firebaseAuthConfig } from './../app.module';
import { firebaseConfig } from './../tasks/task.service.spec';
import { AngularFire, AngularFireModule } from 'angularfire2';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AccountService,
				AngularFire
			],
			imports: [
				AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
			]
		});
	});

	it('should ...', inject([AccountService], (service: AccountService) => {
		expect(service).toBeTruthy();
	}));
});
