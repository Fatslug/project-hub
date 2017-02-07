import { firebaseAuthConfig } from './../app.module';
import { firebaseConfig } from './../tasks/task.service.spec';
import { AngularFireModule, AngularFire } from 'angularfire2';
import { SearchService } from './../search/search.service';
import { ProjectService } from './project.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchComponent } from './../search/search.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { MaterialModule } from '@angular/material';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
	let component: ProjectsComponent;
	let fixture: ComponentFixture<ProjectsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		providers: [
			ProjectService,
			SearchService,
			AngularFire
		],
		declarations: [
			ProjectsComponent,
			ProjectCardComponent,
			SearchComponent
		],
		imports: [
			MaterialModule,
			FormsModule,
			RouterTestingModule.withRoutes([]),
			AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
		]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
