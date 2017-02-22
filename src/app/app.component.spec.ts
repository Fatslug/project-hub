import { firebaseAuthConfig } from './app.module';
import { firebaseConfig } from './tasks/task.service.spec';
import { AngularFire, AngularFireModule } from 'angularfire2';
import { AccountService } from './account/account.service';
import { RouterTestingModule } from '@angular/router/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
		providers: [
			AccountService,
			AngularFire
		],
		declarations: [
			AppComponent
		],
		imports: [
			RouterTestingModule.withRoutes([]),
			AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
		]
		});
		TestBed.compileComponents();
	});

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
