import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CatModel } from '../../../models/cat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { AppointmentModel } from '../../../models/appointment.model';


@Component({
  selector: 'app-view-cat',
  templateUrl: './view-cat.component.html'
})
export class ViewCatComponent implements OnInit {

  model: CatModel;
  loaded: boolean = false;
  catId: string | null;
  appointmentDate: string = "";
  userId: any;

  constructor(public auth: AuthService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.model = {
      id: 0,
      name: 'NULL',
      breed: 'NULL',
      age: 0,
      sex: 'NULL',
      size: 0,
      picture: 'NULL',
      vaccinationStatus: 'NULL',
      personalityTraits: 'NULL',
      adopted: false,
    }

    this.catId = this.route.snapshot.paramMap.get('id');
    this.userId = parseInt(auth.getId());
    console.log(this.userId);

  }

  ngOnInit() {
    this.getCat();
  }

  onFormSubmit() {
    this.http.post('https://localhost:7143/api/appointment', { id: 0, idCat: this.catId, idUser: this.userId, appointmentDate: this.appointmentDate }).subscribe(
      (result) => {
        console.log('success');
        this.getCat();
        this.router.navigate(['categories/cat/v/' + this.catId]);
      }
    )
  }

  getCat() {
    this.http.get<CatModel>('https://localhost:7143/api/cat/' + this.catId).subscribe(
      (result) => {
        this.model = result;
        console.log(this.model);
        this.loaded = true;
      }, (err) => {
        console.error(err);
      }
    )
  }

  editionCat(catId: string | null) {
    this.router.navigate(['categories/cat/update/' + catId]);
  }

  deleteCat(catId: string |null) {
    let i = confirm('Ești sigur că vrei să ștergi pisica cu ID-ul: ' + catId);
    if (i) {
      this.http.delete('https://localhost:7143/api/cat/' + catId).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['categories/cat']);

        }, error: (err) => {
          console.error(err);
        }, complete: () => {

        }
      })
    }
  }
}
