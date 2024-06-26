import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ParentComponent } from "../parent/parent.component";
import { ChildComponent } from "../child/child.component";

@Component({
    selector: 'app-weather-main',
    standalone: true,
    templateUrl: './weather-main.component.html',
    styleUrl: './weather-main.component.scss',
    imports: [CommonModule, ParentComponent, ChildComponent]
})
export class WeatherMainComponent {

}
