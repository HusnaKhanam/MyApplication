import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl} from '@angular/forms';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {
  form:FormGroup;

  constructor(private service:EmployeeService,
    private firestore: AngularFirestore,
    private toastr:ToastrService,
    private router : Router) { }

  ngOnInit() {
    this.resetForm();
    this.form = new FormGroup({
      fullName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      designation: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      Email: new FormControl('',[Validators.required, Validators.email]),
      mobile: new FormControl('',[Validators.required, Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)])

    })
  }

  /*function to reset form after creating and updating form*/
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      fullName: '',
      designation: '',
      Email: '',
      mobile: '',
    }
  }
/* submit the data to be added into database having 'employees' as the data collection array*/
  onSubmit(form: NgForm){
    console.log(form.value);
    this.router.navigateByUrl('/EmployeeList');
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
