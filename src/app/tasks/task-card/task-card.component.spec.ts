import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from './../task.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
	let component: TaskCardComponent;
	let fixture: ComponentFixture<TaskCardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		providers: [
			TaskService
		],
		imports: [
			RouterTestingModule.withRoutes([])
		],
		declarations: [
			TaskCardComponent
		]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
