import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {SignupService} from '../services/signup.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	constructor(private signupService:SignupService) { }

	signupForm: FormGroup;
	firstName: FormControl = new FormControl();
	lastName: FormControl = new FormControl();
	email: FormControl = new FormControl();
	password: FormControl = new FormControl();

	status:string = null;
	token:string = null;

	ngOnInit() {
		this.signupForm = new FormGroup({
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			password: this.password
		})
	}

	ans:any;

	signup(){
		let user = {
			firstName: this.signupForm.value.firstName,
			lastName: this.signupForm.value.lastName,
			password: this.signupForm.value.password,
			email: this.signupForm.value.email
		}

		//form field validation
		if(user.firstName === null || user.lastName === null || user.email === null || user.password === null){
			console.log('empty fields');
			return false;
		}

		if(user.firstName.length < 3 || user.lastName.length < 3){
			console.log('not a valid name');
			this.signupForm.reset();
			return false;
		}

		if(user.password.length < 8){
			console.log('password is too short');
			return false;
		}

		this.signupService.signupUser(user).subscribe((data)=>{
			if(data['token']){
				//user created peacefully
				console.log('user was created');
			}else if(data['msg']){
				//failed to create user
				console.log(data['msg']);
				return false;
			}
		})
	}
}

