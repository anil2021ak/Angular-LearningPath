import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../search.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export interface EmployeeData {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image: string;
}

@Component({
  selector: 'app-api-dashboard',
  standalone: true,
  providers: [ApiService],
  templateUrl: './api-dashboard.component.html',
  styleUrl: './api-dashboard.component.scss',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule,
    NavbarComponent,
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    SearchPipe,
    MatProgressSpinnerModule
  ],
})
export class ApiDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  empdata: EmployeeData[] = [];
  displayTemplate!: TemplateRef<any>;
  page = 1;
  pageSize = 8;
  Date: any = new Date();

  searchText: string = '';

  errorMessage: any;

  

  @ViewChild('loadmsg') private loadmsg!: TemplateRef<any>;
  @ViewChild('errormsg') private errormsg!: TemplateRef<any>;
  @ViewChild('employeedata') private employeedata!: TemplateRef<any>;

  apiSub!: Subscription;

  constructor(private apiService: ApiService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apiSub = this.apiService.getData().subscribe({
      next: (res: any) => {
        this.empdata = res.data;
        console.log(res.data);
      },
      error: (error: any) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.displayTemplate = this.errormsg;
      },
    });
  }

  ngAfterViewInit(): void {
    this.displayTemplate =
      this.empdata.length > 0
        ? (this.displayTemplate = this.employeedata)
        : this.loadmsg;
    this.cd.detectChanges();
  }

  // search(){
  //   console.log(this.searchText);
  //   let search_data = JSON.parse(JSON.stringify(this.empdata));   //Deep Copy it creates new object
  //   // let search_data = [...this.empdata]                         // Shallow Copy it changes the Original object
  //   if(this.searchText.length >= 3){
  //     this.empdata = search_data.filter((emp:any)=>{
  //       return emp.employee_name.toLowerCase().includes(this.searchText.toLowerCase());

  //     });
  //   } else if(this.searchText === '') {
  //     this.empdata = search_data;

  //   }
  // }

  // search() {
  //   if (this.searchText.length > 3) {
  //     this.apiService.searchData(this.searchText);
  //   } else {
  //      this.apiService.getData();
  //   }

  // }

  delete(emp: any) {
    this.empdata.splice(emp, 1);
  }

  ngOnDestroy(): void {
    this.apiSub.unsubscribe();
    this.page = 2;
  }
}
