import { ProjectService } from './../projects/project.service';
import { AngularFireModule, AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
/* tslint:disable:no-unused-variable */

export const firebaseConfig = {
	apiKey: 'AIzaSyCbhwjhSAW-EQOPkL2aYrDdycOwiIy2Lq4',
	authDomain: 'project-hub-21d44.firebaseapp.com',
	databaseURL: 'https://project-hub-21d44.firebaseio.com',
	storageBucket: 'project-hub-21d44.appspot.com',
	messagingSenderId: '594687829626'
};
const firebaseAuthConfig = {
	provider: AuthProviders.Google,
	method: AuthMethods.Popup
};

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('Service: Task', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
		providers: [
			TaskService,
			ProjectService,
			AngularFire
		],
		imports: [
			AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
		],
		});
	});

	it('should ...', inject([TaskService], (service: TaskService) => {
		expect(service).toBeTruthy();
	}));
});
