import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { StoreDataService } from '../store-data.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";



export interface UserData {
  id: any;
  name: any;
  description: any;
  image: any;
}


@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
    imports: [
        CommonModule,
        MatPaginator,
        MatPaginatorModule,
        MatSort,
        MatSortModule,
        
        // MatTableDataSource,
        MatTableModule,
        MatInputModule,
        MatCardModule,
        MatFormFieldModule,
        NavbarComponent
    ]
})
export class AboutComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'image'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:StoreDataService) {
    this.dataSource = new MatTableDataSource<UserData>([]);
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
  }
 
  ngOnInit() {
    this.service.sendGetRequest().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }










  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }


  
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }


}





