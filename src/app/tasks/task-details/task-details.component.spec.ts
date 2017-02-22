import { ProjectService } from './../../projects/project.service';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Data } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { SearchService } from './../../search/search.service';
import { TaskService } from './../task.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaskDetailsComponent } from './task-details.component';

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

describe('TaskDetailsComponent', () => {
	let component: TaskDetailsComponent;
	let fixture: ComponentFixture<TaskDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		providers: [
			TaskService,
			ProjectService,
			SearchService,
			{ provide: APP_BASE_HREF, useValue : '/' },
			{ provide: ActivatedRouteSnapshot,
				useValue: {
					params: {
						subscribe: (fn: (value: Data) => void) => fn({
							id: '1'
						})
					}
				}
			}
		],
		declarations: [ TaskDetailsComponent ],
		imports: [
			RouterTestingModule.withRoutes([]),
			FormsModule,
			AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
		]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});