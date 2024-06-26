import { Component, OnInit } from '@angular/core';
import { DatajsService } from './datajs.service';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-weather-app',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './weather-app.component.html',
  styleUrl: './weather-app.component.scss'
})
export class WeatherAppComponent implements OnInit {
city:any = "Hyderabad";
humidSymbol:any = "%";
sppedSymbol:any = "Km/h"
weatherData:any;

  constructor(private service:DatajsService){}

  ngOnInit(): void {
    this.checkWeather();
  }

  checkWeather(){
    this.service.getWeather(this.city).subscribe((data:any)=>{
      this.weatherData = data;
      console.log("weatherData>>", this.weatherData);
    });
  }

  getWeatherImages(weatherCondition: string): string {
    switch (weatherCondition) {
      case "Clouds":
        return "https://cdn-icons-png.flaticon.com/512/7774/7774417.png";

      case "Clear":
        return "https://static-00.iconduck.com/assets.00/clear-day-icon-1024x1024-exbd0lm2.png";

      case "Mist":
        return "https://cdn3d.iconscout.com/3d/premium/thumb/weather-6546350-5376613.png";

      case "Snow":
        return "https://static.vecteezy.com/system/resources/previews/022/287/856/original/3d-rendering-snowy-weather-icon-3d-render-snow-with-cloud-icon-snowfall-png.png";
      
      case "Smoke":
        return "https://cdn3d.iconscout.com/3d/premium/thumb/smoke-5175068-4328031.png";

      case "Rain":
        return "https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png";

      case "Drizzle":
        return "https://www.freeiconspng.com/thumbs/cloud-rain-icons/cloud-rain-weather-icon-25.png"
        
      default:
        return "https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png"; // Default icon
    }

  }
}
