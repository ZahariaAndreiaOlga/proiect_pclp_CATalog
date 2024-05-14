import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public login: string = '';
  public password: string = '';
  constructor(private auth: AuthService, private router: Router) { }

  onFormSubmit() {
    this.auth.login(this.login, this.password)
      .pipe(first())
      .subscribe(
        (result) => {
          this.router.navigate(['categories/cat']);
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
