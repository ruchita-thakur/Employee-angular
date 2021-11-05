import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  durationInSeconds = 5;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  openAddEmployeeDialog(): void {
    let dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.openSnackBar(
          'Employee added and email has been sent!!',
          'Navigate'
        )
          .onAction()
          .subscribe(() => {
            this.goToEmployeeList();
          });
      }
    });
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  goToHomePage() {
    this.router.navigate(['/home']);
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, { duration: 5000 });
  }
}
