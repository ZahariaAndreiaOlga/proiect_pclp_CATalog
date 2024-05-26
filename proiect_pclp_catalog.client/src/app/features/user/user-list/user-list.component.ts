import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  public userList: UserModel[] = [];
  constructor(private http: HttpClient, private router: Router) { }


  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.http.get<UserModel[]>('https://localhost:7143/api/user').subscribe(
      (result) => {
        this.userList = result;
      }, (err) => {
        console.error(err);
      }
    )
  }

  editUser(userId: number) {
    this.router.navigate(['categories/user/update/' + userId]);
  }

  deleteUser(userId: number) {
    let i = confirm('Ești sigur că vrei să ștergi utilizatorul cu ID-ul: ' + userId);
    if (i) {
      this.http.delete('https://localhost:7143/api/user/' + userId).subscribe({
        next: (response) => {
          console.log(response);
          this.userList = this.userList.filter(user => user.id !== userId);

        }, error: (err) => {
          console.error(err);
        }, complete: () => {

        }
      })
    }
  }

}
