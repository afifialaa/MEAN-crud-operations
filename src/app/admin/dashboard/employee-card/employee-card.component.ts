import { Component, OnInit } from '@angular/core';
import {DashboardServices} from '../services/dashboard.service';
import { HostListener  } from "@angular/core";
import { Router } from '@angular/router';

@Component({
	selector: 'app-employee-card',
	templateUrl: './employee-card.component.html',
	styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {

	constructor(private dashServ:DashboardServices, private router:Router) { }

	empNum:number;

	ngOnInit() {
		console.log('emp card init');
		this.dashServ.getEmployeesNum().subscribe( (data)=>{
			console.log('employee subscribe callback');
			console.log(data);
			this.empNum = data['number']
		})
	}

	@HostListener("click") onClick(){
		this.router.navigate(['/admin/employee']);
	}

}
