import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PocService {

  messageSource = new BehaviorSubject<any>('Initial message in Service.!!!');
  currentMessage$:Observable<any> = this.messageSource.asObservable();

  dataSubject = new Subject<string>();
  observableDataSubject$:Observable<any> = this.dataSubject.asObservable();


  hostUrl = environment.frontEndTestUrl
  apiUrl = this.hostUrl + '/employees'


  constructor(private http:HttpClient) { }

  changeMessage(message:any){
    this.messageSource.next(message);
  }

  updateData(newData:any){
    this.dataSubject.next(newData)
  }


  getData():Observable<any>{
    return this.http.get<any>(this.apiUrl).pipe(map((res:any)=>{
      return res;
    }),retry(3),
    catchError((error:HttpErrorResponse)=>{
      console.error("An Error Occured", error.message);
      return throwError(()=> error.message);
    })
    );
  }

  deleteData(id:any){
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(map((res)=>{
      return res;
    }),retry(3),
    catchError((error:HttpErrorResponse)=>{
      console.error("An Error Deleting", error.message)
      return throwError(()=> error.message)
    }));
  };

  postData(data:any):Observable<any>{
    return this.http.post<any>(this.apiUrl, data).pipe(map((res)=>{
      return res;
    }), retry(3),
    catchError((error:HttpErrorResponse)=>{
      console.error("An Error Posting Data", error.message);
      return throwError(()=>error.message);
    }));
  };

  UpdateData(id:any, newData:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`,newData).pipe(map((res)=>{
      return res;
    }), retry(3),
    catchError((error:HttpErrorResponse)=>{
      console.error("An Error Occured in Updating Data", error.message);
      return throwError(()=>error.message);
    }));
}

}