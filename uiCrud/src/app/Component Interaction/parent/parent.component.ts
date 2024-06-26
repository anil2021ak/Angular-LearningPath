import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatajsService } from 'src/app/weather-app/datajs.service';
import { ChildComponent } from "../child/child.component";

@Component({
    selector: 'app-parent',
    standalone: true,
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.scss',
    imports: [FormsModule, CommonModule, ChildComponent,ReactiveFormsModule]
})
export class ParentComponent {

  cityName!:any;
  climate:any;
  Locations:string[] = []

  constructor(private service:DatajsService){}

  loadLocations(cityName:any){
    this.Locations.push(cityName);
    this.cityName='';
  }

  onCardClick(city:any){
    this.service.getWeather(city).subscribe({
           next:(res) =>{
             console.log(res);
             this.climate = res;
           },
          error(){
            console.error("Api Fetching an Error")
          },
           complete(){
            console.log("Fetching Completed")
          }
       })
  }

  refresh(city:any){
    this.service.getWeather(city.value).subscribe({
      next: (res) => {
        console.log(res);
        this.climate = res;
      },
      error() {
        console.error("Api Fetching an Error")
      },
      complete() {
        console.log("Fetching Completed")
      }
    })

  console.log("Refersh>>>",city.value)
  }

  delete(city:any){
    this.Locations.splice(city,1)
  }

}
