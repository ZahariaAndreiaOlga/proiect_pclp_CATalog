import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentModel } from '../../../models/appointment.model';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html'
})
export class ListAppointmentComponent implements OnInit {

  public ListAppointment: AppointmentModel[] = [];
  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit() {
    this.getAppointment();
  }

  getAppointment() {
    this.http.get<AppointmentModel[]>('https://localhost:7143/api/appointment').subscribe(
      (result) => {
        this.ListAppointment = result;
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
          this.ListAppointment = this.ListAppointment.filter(appointment => appointment.id !== appointmentId);

        }, error: (err) => {
          console.error(err);
        }, complete: () => {

        }
      })
    }
  }

}
