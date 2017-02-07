import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from './../project.service';
import { firebaseAuthConfig, firebaseConfig } from './../../app.module';
import { AngularFire, AngularFireModule } from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent } from './../../tasks/task-card/task-card.component';
import { SearchComponent } from './../../search/search.component';
import { SearchService } from './../../search/search.service';
import { MaterialModule } from '@angular/material';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
	let component: ProjectDetailsComponent;
	let fixture: ComponentFixture<ProjectDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		providers: [
			SearchService,
			AngularFire,
			ProjectService
		],
		imports: [
			MaterialModule,
			FormsModule,
			RouterTestingModule.withRoutes([]),
			AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
		],
		declarations: [
			ProjectDetailsComponent,
			SearchComponent,
			TaskCardComponent
		]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});