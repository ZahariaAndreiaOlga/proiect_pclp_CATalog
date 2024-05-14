import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {

  model: UserModel

  constructor(private http: HttpClient, private router: Router) {
    this.model = {
      login: '',
      password: '',
      shelterName: '',
      role: 'User'
    }
  }

  onFormSubmit() {
    console.log(this.model);
    this.http.post<void>('https://localhost:7143/api/user', this.model).subscribe({
      next: (response) => {
        console.log('success');
        this.router.navigate(['categories/user']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
