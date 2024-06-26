import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatajsService {

  hostUrl = environment.weatherUrl
  weatherUrl = this.hostUrl + "data/2.5/weather?&units=metric&q="
  //apiKey:any = "97ed86b99fdcf738c7a080e0fa9fde20";
  apikey = environment.weatherApiKey;

  constructor(private http:HttpClient){}

  getWeather(city:any):Observable<any> {
   return this.http.get(`${this.weatherUrl}${city}&appid=${this.apikey}`).pipe(map((res:any)=>{
    return res;
   }),retry(3),
   catchError((err:HttpErrorResponse)=>{
    return throwError(()=> err);
   })
   );

  }






}
