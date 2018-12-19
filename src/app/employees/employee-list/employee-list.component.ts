import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Modal} from 'carbon-components';
declare var $: any;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less']
})
export class EmployeeListComponent implements OnInit {
  list: Employee[];
  filteredEmployees : Employee[];
  private _searchTerm:string;
  private contentDeleteId;
  get searchTerm(): string{
    return this._searchTerm;
  }
  set searchTerm(value: string){
  this._searchTerm = value;
  this.filteredEmployees = this.filterEmployees(value);
  }

  filterEmployees(searchString: string){
    return this.list.filter(emp => 
      emp.fullName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  constructor(private service:EmployeeService,
    private firestore:AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.filteredEmployees= this.list;
    this.service.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      })
      this.filteredEmployees= this.list;
    });
  }
  onEdit(emp:Employee){
    this.service.formData=Object.assign({},emp);
  }
  
  onDelete(id: string) {
    this.contentDeleteId = id;
    let modalInstance = Modal.create(document.getElementById('delete-confirmation-modal'));
        modalInstance.show();
    // $(document).ready(function(){  
    //       $("#delete-confirmation-modal").modal();
  }
  
  deleteEmployee(){
    const id = this.contentDeleteId;
    this.firestore.doc('employees/' + id).delete();
    this.toastr.warning('Deleted successfully','Employee Register');
  }
     
    


}
