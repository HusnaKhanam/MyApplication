import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData : Employee;

  constructor(private firestore:AngularFirestore) { }
  
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
