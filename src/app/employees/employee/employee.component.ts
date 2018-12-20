import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {

  constructor(private service:EmployeeService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  /*function to reset form after creating and updating form*/
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      fullName: '',
      designation: '',
      empCode: '',
      mobile: '',
    }
  }
/* submit the data to be added into database having 'employees' as the data collection array*/
  onSubmit(form: NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    if(form.value.id == null)
    this.firestore.collection('employees').add(data);
    else
    this.firestore.doc('employees/'+form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully','Employee Register');
  }

}
