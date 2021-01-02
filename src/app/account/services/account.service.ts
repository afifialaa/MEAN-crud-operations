import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.dev';

@Injectable({
	providedIn: 'root'
})
export class AccountService {

	constructor(private httpClient:HttpClient) { }

	signupUser(user) {
		console.log('creating user');
		return this.httpClient.post(environment.signupUrl, user, {responseType: 'json'});
	}

	loginUser(user){
		console.log('loggin user in');
		return this.httpClient.post(environment.loginUrl, user, {responseType: 'json'});
	}
}
