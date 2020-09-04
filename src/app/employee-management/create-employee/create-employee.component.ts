import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateEmail } from '../../shared/validator-email';
import { CountryService } from '../../services/country.service';


@Component({
	selector: 'app-create-employee',
	templateUrl: './create-employee.component.html',
	styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

	createEmployeeForm: FormGroup;
	countries: any[];

	constructor(private empService: EmployeeService, private fb: FormBuilder, private countryService: CountryService) {
	}

	ngOnInit() {

		// Load countries list
		this.countries = this.countryService.countries;

		this.createEmployeeForm = new FormGroup({
			firstName: new FormControl('', [
				Validators.required,
				Validators.minLength(3)
			]),
			lastName: new FormControl('', [
				Validators.required,
				Validators.minLength(3)
			]),
			email: new FormControl('', [
				Validators.required,
				Validators.minLength(11)
			]),
			phoneNumber: new FormControl('', [
				Validators.required,
				Validators.minLength(11)
			]),
			country: new FormControl('', [
				Validators.required
			]),
			gender: new FormControl('', [
				Validators.required,
				Validators.minLength(4)
			]),
			jobTitle: new FormControl('', [
				Validators.required,
				Validators.minLength(3)
			])
		})
	}

	// Getters
	get firstName(){
		return this.createEmployeeForm.get('firstName');
	}
	get lastName(){
		return this.createEmployeeForm.get('lastName');
	}
	get email(){
		return this.createEmployeeForm.get('email');
	}
	get phoneNumber(){
		return this.createEmployeeForm.get('phoneNumber');
	}
	get gender(){
		return this.createEmployeeForm.get('gender');
	}
	get jobTitle(){
		return this.createEmployeeForm.get('jobTitle');
	}

	// Form button handler
	createEmployee(): void {

		let employee: Employee = {
			firstName: this.createEmployeeForm.value.firstName,
			lastName: this.createEmployeeForm.value.lastName,
			email: this.createEmployeeForm.value.email,
			phoneNumber: this.createEmployeeForm.value.phoneNumber,
			country: this.createEmployeeForm.value.country,
			gender: this.createEmployeeForm.value.gender,
			jobTitle: this.createEmployeeForm.value.jobTitle
		}

		if (this.createEmployeeForm.valid == true) {
			this.empService.addEmployee(employee);
			//reset form
			this.createEmployeeForm.reset();
		} else {
			console.log('form is invalid');
			return;
		}
	}

	updateMsg: string = '';
	status: boolean = false;
}
