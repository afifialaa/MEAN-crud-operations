import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateEmail } from '../../../shared/validator-email';

// Models & Services
import { CountryService } from '../../../services/country.service';
import {JobsService} from '../../../services/jobs.service';
import {Iemployee} from '../../../models/iemployee';


@Component({
	selector: 'app-create-employee',
	templateUrl: './create-employee.component.html',
	styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

	createEmployeeForm: FormGroup;
	countries: any[];
	jobs: any[];

	errMsg:string;
	msg: string;

	constructor(private empService: EmployeeService, private fb: FormBuilder, private countryService: CountryService, private jobsService:JobsService) {
	}

	ngOnInit() {

		// Load countries list
		this.countries = this.countryService.countries;
		this.jobs = this.jobsService.jobs;

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
			university: new FormControl(''),
			country: new FormControl('', [
			]),
			city: new FormControl(''),
			address: new FormControl('', [
			]),
			gender: new FormControl('', [
				Validators.required,
				Validators.minLength(4)
			]),
			jobTitle: new FormControl('', [
				Validators.required,
				Validators.minLength(3)
			]),
			department: new FormControl(''),
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

		let employee: Iemployee = {
			firstName: this.createEmployeeForm.value.firstName,
			lastName: this.createEmployeeForm.value.lastName,
			email: this.createEmployeeForm.value.email,
			gender: this.createEmployeeForm.value.gender,
			phoneNumber: this.createEmployeeForm.value.phoneNumber,
			university: this.createEmployeeForm.value.university,
			country: this.createEmployeeForm.value.country,
			city: this.createEmployeeForm.value.city,
			address: this.createEmployeeForm.value.address,
			jobTitle: this.createEmployeeForm.value.jobTitle,
			department: this.createEmployeeForm.value.department,
		}

		if (this.createEmployeeForm.valid == true) {
			this.empService.addEmployee(employee).subscribe((data) => {
				if(data['err']){
					this.msg = '';
					this.errMsg = data['err'];
					return;
				}else if (data['msg']){
					this.errMsg = '';
					this.msg = data['msg'];
				}
			})
			// Reset form
			this.createEmployeeForm.reset();
		} else {
			console.log('form is invalid');
			return;
		}
	}

	updateMsg: string = '';
	status: boolean = false;
}