import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { DatajsService } from 'src/app/weather-app/datajs.service';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent implements OnDestroy{

@Input() climate:any;

@Input() city:any


@Output() refreshcurrentLocation = new EventEmitter<any>();

refreshpage!:Subscription;

constructor(private service:DatajsService){
}


refreshWeatherContent(){
  this.refreshcurrentLocation.emit(this.city)
  console.log("Child>>>>", this.city.value)
  
}

ngOnDestroy(): void {
 // this.refreshpage.unsubscribe();
}


getWeatherImages(weatherCondition: string): string {
  switch (weatherCondition) {
    case "Clouds":
      return "assets/weatherSvg/02d.svg";

    case "Clear":
      return "assets/weatherSvg/01d.svg";

    case "Mist":
      return "assets/weatherSvg/01n.svg";

    case "Snow":
      return "assets/weatherSvg/04d.svg";
    
    case "Smoke":
      return "assets/weatherSvg/09n.svg";

    case "Rain":
      return "assets/weatherSvg/11d.svg";

    case "Drizzle":
      return "assets/weatherSvg/50d.svg"
      
    default:
      return "assets/weatherSvg/50n.svg"; // Default icon
  }
}

}
