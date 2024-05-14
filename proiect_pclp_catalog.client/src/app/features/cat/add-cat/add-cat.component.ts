import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CatModel } from '../../../models/cat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html'
})
export class AddCatComponent {

  model: CatModel;

  constructor(private http: HttpClient, private router: Router) {
    this.model = {
      name: '',
      breed: '',
      age: 0,
      sex: 'Male',
      size: 0,
      picture: '',
      vaccinationStatus: '',
      personalityTraits: '',
      adopted: false,
      creationDate: Date.now().toString(),
      updatedDate: Date.now().toString(),
    }
  }

  onFormSubmit() {
    console.log(this.model);
    this.http.post<void>('https://localhost:7143/api/cat', this.model).subscribe({
      next: (response) => {
        console.log('success');
        this.router.navigate(['categories/cat']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
