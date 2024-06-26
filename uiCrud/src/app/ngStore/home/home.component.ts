import { Component, OnDestroy, OnInit } from "@angular/core";
import { StoreDataService } from "../store-data.service";
import { CommonModule } from "@angular/common";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Subscription } from "rxjs";

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from "src/app/navbar/navbar.component";



@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatProgressSpinnerModule,NgbPaginationModule, NavbarComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Array<any> = [];
  productsSub!: Subscription;

pageSize: number = 9;
page: number = 1;

  

  constructor(private storeData: StoreDataService) {}

  ngOnInit(): void {
    this.productsSub = this.storeData.sendGetRequest().subscribe((res:any) => {
        console.log(res);
        this.products = res;
      });
  }

 
  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
