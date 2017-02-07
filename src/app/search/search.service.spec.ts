import { AngularFire, AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchService } from './search.service';

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

describe('Service: Search', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
		declarations: [],
		imports: [
			AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
		],
		providers: [
			AngularFire,
			SearchService
		],
		});
	});

	it('should ...', inject([SearchService], (service: SearchService) => {
		expect(service).toBeTruthy();
	}));
});