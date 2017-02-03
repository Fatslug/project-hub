// Services
import { AccountService } from './account/account.service';
import { AuthGuardService } from './auth-guard.service';
import { ProjectService } from './projects/project.service';
import { TaskService } from './tasks/task.service';

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
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskCardComponent } from './tasks/task-card/task-card.component';
import { SearchComponent } from './search/search.component';

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
			path: 'view/:id',
			component: ProjectDetailsComponent
		}, {
			path: 'edit/:id',
			component: ProjectFormComponent
		}, {
			path: 'add',
			component: ProjectFormComponent
		}]
	}, {
		path: 'tasks',
		canActivate: [AuthGuardService],
		children: [{
			path: '',
			component: TasksComponent,
		}, {
			path: 'add',
			component: TaskFormComponent
		}, {
			path: 'view/:id',
			component: TaskDetailsComponent
		}, {
			path: ':pid/add',
			component: TaskFormComponent
		}, {
			path: ':edit/:id',
			component: TaskFormComponent
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
		ProjectDetailsComponent,
		TasksComponent,
		TaskDetailsComponent,
		TaskFormComponent,
		TaskCardComponent
	,
    SearchComponent
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
		AuthGuardService,
		TaskService,
		ProjectService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
