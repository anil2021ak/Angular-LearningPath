import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,retry, catchError, throwError, tap, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService {


  parseLinkHeader(header:any) {
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');
    var links:any = {};
    parts.forEach( (p:any) => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    
  }

  url = environment.REST_API_SERVER 

  constructor(private httpClient:HttpClient) { }

  
  handleError(error:HttpErrorResponse){
    let errorMsg = 'Unknown Error!';
    if(error.error instanceof ErrorEvent){
      //Client side Error
      errorMsg = `Error:${error.error.message}`
    }
    else{
      // Server-side errors
      errorMsg = `Error Code: ${error.status}\n Message:${error.message}`
    }

    window.alert(errorMsg);
    return throwError(() => errorMsg);
  }

  sendGetRequest(){
    return this.httpClient.get(this.url + '/products').pipe(map((res:any)=>{
      return res;
    }),retry(3),catchError((err:HttpErrorResponse)=>{
      return throwError(()=> err);
    }))
  }

}

    


