import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Employee } from 'src/app/shared/employee.model'

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.less']
})
export class FeedBackComponent implements OnInit {
  form:FormGroup;
  public category: Array<any>;
  selectedCat: any[];

  constructor(private service:EmployeeService,
    private firestore: AngularFirestore,
    private toastr:ToastrService,
    private router : Router,
    private _router: ActivatedRoute,
    private formBuilder:FormBuilder)
     {this.category = [
      { id: 1, value: 'design' },
      { id: 2, value: 'functionality' },
      { id: 3, value: 'performance' }
    ];
    this.selectedCat = this.category[0].id;
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fullName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      msg: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      category: ['', Validators.required],
      Email: new FormControl('',[Validators.required, Validators.email]),
    });
    /*both will work for set value manually*/
    //this.feedbackForm.get('category').setValue(this.selectedCat);
    this.form.controls["category"].setValue(this.selectedCat);
  }

  onSubmit():void{
    console.log(this.form.value);
    let data = Object.assign({},this.form.value);
    this.firestore.collection('FeedBack').add(data);
    this.toastr.success('Submitted successfully','FeedBack');
    this.router.navigate(['/RegisterEmployee/0']);
  }
  // private resetForm(){
  //   this.form.patchValue({
  //     fullName:'',
  //     msg:'',
  //     Email:'',
  //     category: '',
  //   });
  //   }
  

}
