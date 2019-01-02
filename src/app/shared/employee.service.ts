import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData : Employee;

  constructor(private firestore:AngularFirestore,
    private http:HttpClient) { }
  
/*Function to get added employees list from firebase database*/
  getEmployees(){
    let listOfEmployees = this.firestore.collection('employees').snapshotChanges();
   return listOfEmployees;   
  }
getEmployeeDetails(id:string){
    let employeeId = this.firestore.collection('employees').doc(id).valueChanges();
    return employeeId;
  }  
}
