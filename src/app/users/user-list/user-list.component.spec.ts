/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserList.componentComponent } from './user-list.component.component';

describe('UserList.componentComponent', () => {
  let component: UserList.componentComponent;
  let fixture: ComponentFixture<UserList.componentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserList.componentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserList.componentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});