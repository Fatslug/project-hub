import { AngularFire, AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { SearchService } from './../search/search.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { SearchComponent } from './../search/search.component';
import { TaskCardComponent } from './task-card/task-card.component';

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

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { TasksComponent } from './tasks.component';

// App Routing
const appRoutes: Routes = [
	{
		path: '',
		component: TasksComponent
	}, {
		path: 'tasks',
		component: TasksComponent
	}
];

describe('TasksComponent', () => {
	let component: TasksComponent;
	let fixture: ComponentFixture<TasksComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [
			TasksComponent,
			TaskCardComponent,
			SearchComponent
		],
		imports: [
			MaterialModule,
			RouterModule.forRoot(appRoutes),
			FormsModule,
			AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
		],
		providers: [
			{provide: APP_BASE_HREF, useValue : '/' },
			SearchService,
			AngularFire
		]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TasksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
