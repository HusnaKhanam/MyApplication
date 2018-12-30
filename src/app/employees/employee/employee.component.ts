import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Employee } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {
  form:FormGroup;
  id:string;
  employeeId:any;
  editMode = false;
  singleId:any;
  employee:any;

  constructor(private service:EmployeeService,
    private firestore: AngularFirestore,
    private toastr:ToastrService,
    private router : Router,
    private _router: ActivatedRoute,
    private formBuilder:FormBuilder ) { }

  ngOnInit() {
    //this.resetForm();
    this.form = this.formBuilder.group({
      fullName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      designation: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      Email: new FormControl('',[Validators.required, Validators.email]),
      mobile: new FormControl('',[Validators.required, Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)])
    });
    const param = this._router.snapshot.paramMap.get('id'); //Read the id from the url parameter(specific selected id to update)
    if (param) {
      this.id = param;
      this.getProduct(this.id);
    }
  }
  
  /*get data from the selected id of the element to be updated/edited
  *from the employee list table(Firebasecollection)*/
  private getProduct(id:any){
    if(id === "0"){
      this.employee = {
        fullName:'',
        designation:'',
        Email:'',
        mobile:''
      }
    }else{
  this.service.getEmployeeDetails(id).subscribe( i => {
    this.employee= i;
    this.updateEmployee(this.employee);
    //console.log(this.employee)
  });
}
}

private updateEmployee(employeeDetails:any){
  this.form.patchValue({
    fullName:employeeDetails.fullName,
    designation: employeeDetails.designation,
    Email:employeeDetails.Email,
    mobile: employeeDetails.mobile
  });
  }

/* submit the data to be added into database having 'employees' as the data collection array*/
  onSubmit():void{
    console.log(this.form.value);
    this.router.navigateByUrl('/EmployeeList');
    let data = Object.assign({},this.form.value);
    if(this.id == "0")
    this.firestore.collection('employees').add(data);
    else
    this.firestore.doc('employees/'+this.id).update(data);
    this.toastr.success('Submitted successfully','Employee Register');
  }

}
