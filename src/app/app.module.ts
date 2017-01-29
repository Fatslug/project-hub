// Services
import { AuthGuardService } from './auth-guard.service';
import { ProjectService } from './projects/project.service';

// Angular Libraries
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

// Firebase configuration with AngularFire2
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
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

// Custom Components
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AccountService } from './account/account.service';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';

// App Routing
const appRoutes: Routes = [
	{
		path: '',
		component: HomePageComponent
	},
	{
		path: 'home',
		component: HomePageComponent
	},
	{
		path: 'projects',
		canActivate: [AuthGuardService],
		children: [{
			path: '',
			component: ProjectsComponent
		}, {
			path: ':id',
			component: ProjectDetailsComponent
		}, {
			path: 'edit/:id',
			component: ProjectFormComponent
		}, {
			path: 'add',
			component: ProjectFormComponent
		}]
	}
];

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		ProjectsComponent,
		ProjectFormComponent,
		ProjectCardComponent,
		ProjectDetailsComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		MaterialModule.forRoot(),
		RouterModule.forRoot(appRoutes),
		AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
	],
	providers: [
		AccountService,
		AuthGuardService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
