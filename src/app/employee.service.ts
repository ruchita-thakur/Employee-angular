import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Employee } from './employee';
import {catchError,tap} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl="http://localhost:10000/api/v1/employees";

  constructor(private httpClient:HttpClient) { }

  getEmployeesList():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseUrl}`);
    
  }

  createEmployee(employee:Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,employee)
  }

  getEmployeeById(id:number):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
  }

  updateEmployee(id:number, employee:Employee):Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`,employee)
  }

  deleteEmployee(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }
  
}

