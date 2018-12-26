import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {FeedBackComponent} from './employees/feed-back/feed-back.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { PageNotFoundComponent } from './employees/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo:'/RegisterEmployee', pathMatch:'full'},
    { path : 'RegisterEmployee' , component : EmployeeComponent},
    { path : 'EmployeeList' , component: EmployeeListComponent },
    { path : 'FeedBack' , component: FeedBackComponent},
    {path : '**' , component:PageNotFoundComponent}
];

@NgModule({
    imports:[CommonModule,RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{ }
export const routingComponents = [EmployeeComponent,FeedBackComponent,EmployeeListComponent,PageNotFoundComponent]