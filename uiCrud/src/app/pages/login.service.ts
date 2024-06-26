import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userEmail = new BehaviorSubject<any>('');
  userEmail$ = this.userEmail.asObservable();

  getuserdetails(){
    return localStorage.getItem('userEmail')
  }

  setUserEmail(email: any) {
     this.userEmail.next(email);
     localStorage.setItem('userEmail',email)

      }

users:any = [
  { email: 'user1@gmail.com', password: 'password1' },
  { email: 'user2@gmail.com', password: 'password2' },
  { email: 'user3@gmail.com', password: 'password3' },
  { email: 'user4@gmail.com', password: 'password4' },
  { email: 'user5@gmail.com', password: 'password5' },
]

  constructor( ) { 
    let userEmailLs = localStorage.getItem('userEmail');
    if(userEmailLs){
      this.userEmail.next(userEmailLs);
    }
  }

getUsers(){
 return this.users;
}

}
