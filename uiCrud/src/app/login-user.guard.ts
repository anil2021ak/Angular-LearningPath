import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./pages/login.service";

@Injectable({ providedIn: "root" })
export class AuthGuard  {
  constructor(
    private loginservice: LoginService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = this.loginservice.getuserdetails();
    if(user){
      return true
    } else {
      return this.router.createUrlTree(["/login"]);
    }
  }
}