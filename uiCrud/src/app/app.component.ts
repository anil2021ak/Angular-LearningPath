import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiDashboardComponent } from "./api-dashboard/api-dashboard.component";
import { HomeComponent } from './ngStore/home/home.component';
import { AboutComponent } from './ngStore/about/about.component';
import { StoreDataService } from './ngStore/store-data.service';
import { DatajsService } from './weather-app/datajs.service';
import { ManageDataService } from './Jabberjet/manage-data.service';
import { PocService } from './poc.service';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,
        NavbarComponent,
        DashboardComponent,
        HttpClientModule,
        HomeComponent,
        AboutComponent,
        CommonModule,
        FormsModule, ApiDashboardComponent,
      ],
      providers:[StoreDataService,DatajsService,ManageDataService, PocService]
})
export class AppComponent {
  title = 'uiCrud';
}
