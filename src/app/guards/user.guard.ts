import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  isAdmin!:boolean;
  constructor(private authService: AuthService, private route : Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.isAdmin.subscribe(
        data =>{
          this.isAdmin = data;
        }
      )
      if(!this.isAdmin ){
        return true;
      }

      this.route.navigate(['login']);
    return true;
  }

}
