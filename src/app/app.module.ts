// Angular Libraries
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

// Custom Components
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AccountService } from './account/account.service';

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
	method: AuthMethods.Redirect
};

// App Routing
const appRoutes: Routes = [
	{ path: '', component: HomePageComponent },
	{ path: 'home', component: HomePageComponent }
];

@NgModule({
declarations: [
	AppComponent,
	HomePageComponent
],
imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	MaterialModule.forRoot(),
	RouterModule.forRoot(appRoutes),
	AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
],
providers: [
	AccountService
],
bootstrap: [AppComponent]
})
export class AppModule { }