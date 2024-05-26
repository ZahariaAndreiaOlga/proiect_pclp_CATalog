import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode, { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthService {

  private role: any = null;
  private id: any = null;
  constructor(private http: HttpClient) {

    if (this.loggedIn) {
      this.decodeToken(localStorage.getItem('access_token'));
      console.log(localStorage.getItem('access_token'));
      console.log(this.getRole());
    }
  }

  login(login: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>('https://localhost:7143/api/login', { login: login, password: password })
      .pipe(
        map(result => {
          console.log(result.token);
          localStorage.setItem('access_token', result.token);
          this.decodeToken(localStorage.getItem('access_token'));
          return true;
        })
      );
  }

  signin(login: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>('https://localhost:7143/api/signup', { login: login, password: password })
      .pipe(
        map(result => {
          console.log(result.token);
          localStorage.setItem('access_token', result.token);
          this.decodeToken(localStorage.getItem('access_token'));
          return true;
        })
      );
  }

  decodeToken(token: any) {
    try {
      const decodedToken: any = jwtDecode(token);
      this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
      console.log("ID  : " + this.id);
    } catch (err) {
      console.error('Token decoding failed', err);
      this.role = null;
    }
  }

  getRole() {
    return this.role;
  }

  getId() {
    return this.id;
  }

  public get isAdmin(): boolean {
    // console.log("isAdmin :" + this.role);
    return this.role === "Admin";
  }

  public get isAbleToPost(): boolean {
    return (this.role === "Admin" || this.role === "Foster");
  }

  isRole(expectedRole: string): boolean {
    return this.role === expectedRole;
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}
