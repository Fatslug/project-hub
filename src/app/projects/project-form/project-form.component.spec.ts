import { SearchComponent } from './../../search/search.component';
import { TaskCardComponent } from './../../tasks/task-card/task-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { firebaseAuthConfig } from './../../app.module';
import { firebaseConfig } from './../../tasks/task.service.spec';
import { AngularFire, AngularFireModule } from 'angularfire2';
import { SearchService } from './../../search/search.service';
import { ProjectService } from './../project.service';
import { TaskService } from './../../tasks/task.service';
import { MaterialModule } from '@angular/material';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectFormComponent } from './project-form.component';

describe('ProjectFormComponent', () => {
	let component: ProjectFormComponent;
	let fixture: ComponentFixture<ProjectFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		providers: [
			ProjectService,
			TaskService,
			SearchService,
			AngularFire
		],
		declarations: [
			ProjectFormComponent,
			TaskCardComponent,
			SearchComponent
		],
		imports: [
			MaterialModule,
			FormsModule,
			ReactiveFormsModule,
			RouterTestingModule.withRoutes([]),
			AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
		]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
