import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const expectedRole = next.data['expectedRole'];
    const userRole = this.auth.getRole();

    console.log(expectedRole);

    if (!expectedRole.includes(userRole)) {
      this.router.navigate(['unauthorized']);
      return false;
    }

    if (localStorage.getItem('access_token')) {
      return true;
    }

    // this.router.navigate(['login']);
    return false;
  }
}
