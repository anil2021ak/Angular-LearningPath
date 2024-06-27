import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../../navbar/navbar.component";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<any>;
  loginFailed = false;
  userDetailstoDashboard: any = "Parent";

  loginErrorMsg: any = "";

  Passwordhide:boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private cookie: CookieService
  ) {}
  ngOnInit(): void {
    let user = this.loginService.getuserdetails();
    if(user){
      this.router.navigate(['/skills']);
    };
    
    this.loginForm = this.fb.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, Validators.required],
    });
  }
  // keepLogin(event: any) {
  //   let checked = event.target.checked;
  //   console.log("Checked", checked);
  //   let storage = sessionStorage.getItem('SessionEmail');
  //   if(checked){
      
  //   }
  // }
  submit(form: FormGroup) {
    let email = form.value.email;
    //let email = form.get('email')?.value
    let password = form.value.password;

    let res = this.loginService.getUsers().find((t: any) => t.email === email);
    console.log(res);

    if (!res) {
      this.loginErrorMsg = "Please Check your Email.!!!";
    } else if (res.password !== password) {
      this.loginErrorMsg = "Please check your Password.!!!";
    } else {
      this.loginService.setUserEmail(email);
      this.router.navigate(["/skills"]);
    }
  }
}
