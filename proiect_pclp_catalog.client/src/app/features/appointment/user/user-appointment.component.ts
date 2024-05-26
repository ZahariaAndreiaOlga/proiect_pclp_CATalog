import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-user-appointment',
  templateUrl: './user-appointment.component.html'
})
export class UserAppointmentComponent implements OnInit {

  public model: UserModel;
  public userId: number;
  constructor(public auth: AuthService,private http: HttpClient, private router: Router) {
    this.model = {
      id: -1,
      login: '',
      password: '',
      shelterName: '',
      role: 'User'
    }

    this.userId = auth.getId();

  }


  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.http.get<UserModel>('https://localhost:7143/api/user/' + this.userId).subscribe(
      (result) => {
        this.model = result;
        console.log(this.model);
      }, (err) => {
        console.error(err);
      }
    )
  }

  viewCat(catId: number) {
    this.router.navigate(['categories/cat/v/' + catId]);
  }

  deleteAppointment(appointmentId: number | null) {
    let i = confirm('Ești sigur că vrei să ștergi programarea cu ID-ul: ' + appointmentId);
    if (i) {
      this.http.delete('https://localhost:7143/api/appointment/' + appointmentId).subscribe({
        next: (response) => {
          console.log(response);
          this.model.appointment = this.model.appointment?.filter(appointment => appointment.id !== appointmentId);

        }, error: (err) => {
          console.error(err);
        }, complete: () => {

        }
      })
    }
  }

}
