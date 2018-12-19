import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData : Employee;

  constructor(private firestore:AngularFirestore) { }

  getEmployees(){
    let listOfEmployees = this.firestore.collection('employees').snapshotChanges();
   return listOfEmployees;
   
  }
}