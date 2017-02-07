import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from './../project.service';
import { MaterialModule } from '@angular/material';
import { TaskService } from './../../tasks/task.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectCardComponent } from './project-card.component';

describe('ProjectCardComponent', () => {
	let component: ProjectCardComponent;
	let fixture: ComponentFixture<ProjectCardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		providers: [
			TaskService,
			ProjectService
		],
		declarations: [
			ProjectCardComponent
		],
		imports: [
			MaterialModule,
			RouterTestingModule.withRoutes([])
		]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});