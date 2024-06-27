import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../pages/login.service';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  userEmail:any= '';
 
  constructor(private loginService:LoginService, private router:Router){}

  ngOnInit(): void {
   this.loginService.userEmail$.subscribe(email =>{
    this.userEmail = email;
   
   })
  }

  logOut(): void {
    localStorage.removeItem('userEmail'); // Remove specific item from localStorage
    this.loginService.setUserEmail(''); // Clear userEmail BehaviorSubject
    this.router.navigate(['/login']);
  }

}
