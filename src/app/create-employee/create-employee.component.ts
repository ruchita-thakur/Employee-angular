import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  maxDate = new Date();

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialogRef: MatDialogRef<CreateEmployeeComponent>
  ) {}
  ngOnInit(): void {}

  emailId = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.emailId.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailId.hasError('email') ? 'Not a valid email' : '';
  }

  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(
      (data) => {
        console.log(data);
        //this.goToHomePage();
        //this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }
  goToHomePage() {
    this.router.navigate(['/home']);
  }
  onSubmit() {
    this.employee.emailId = this.emailId.value;
    console.log(this.employee);

    this.saveEmployee();

    this.dialogRef.close(this.employee);
  }
  dismiss() {
    this.dialogRef.close(null);
  }
  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
