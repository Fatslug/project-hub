import { SearchService } from './../../search/search.service';
import { APP_BASE_HREF } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from './../../projects/project.service';
import { AuthProviders, AuthMethods, AngularFireModule, AngularFire } from 'angularfire2';
import { TaskService } from './../task.service';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Data, ActivatedRouteSnapshot } from '@angular/router';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

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

import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
	let component: TaskFormComponent;
	let fixture: ComponentFixture<TaskFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		providers: [
			TaskService,
			ProjectService,
			AngularFire,
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
		declarations: [
			TaskFormComponent
		],
		imports: [
			RouterTestingModule.withRoutes([]),
			ReactiveFormsModule,
			FormsModule,
			MaterialModule,
			AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
		]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});