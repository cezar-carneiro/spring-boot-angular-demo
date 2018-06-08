import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public jwtHelper: JwtHelperService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('access_token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['login'], {queryParams: {redirectTo: state.url}});
      return false;
    } else {
      return true;
    }
  }
}
