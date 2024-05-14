import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html'
})
export class UpdateUserComponent implements OnInit {

  model: UserModel;
  userId: string | null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.model = {
      login: '',
      password: '',
      shelterName: '',
      role: 'User'
    }

    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.http.get<UserModel>('https://localhost:7143/api/user/' + this.userId).subscribe(
      (result) => {
        this.model = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onFormSubmit() {
    console.log(this.model);
    this.http.put<void>('https://localhost:7143/api/user/' + this.userId, this.model).subscribe({
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
