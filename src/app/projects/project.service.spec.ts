import { firebaseAuthConfig } from './../app.module';
import { firebaseConfig } from './../tasks/task.service.spec';
import { AngularFire, AngularFireModule } from 'angularfire2';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectService } from './project.service';

describe('Service: Project', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
		providers: [
			ProjectService,
			AngularFire
		],
		imports: [
			AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
		]
		});
	});

	it('should ...', inject([ProjectService], (service: ProjectService) => {
		expect(service).toBeTruthy();
	}));
});
