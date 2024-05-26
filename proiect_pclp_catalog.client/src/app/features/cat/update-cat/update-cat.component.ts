import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CatModel } from '../../../models/cat.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-cat',
  templateUrl: './update-cat.component.html'
})
export class UpdateCatComponent implements OnInit {

  model: CatModel;
  catId: string | null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {

    this.model = {
      name: '',
      breed: '',
      age: 0,
      sex: '',
      size: 0,
      picture: '',
      vaccinationStatus: '',
      personalityTraits: '',
      adopted: false,
      updatedDate: Date.now().toString(),
    }

    this.catId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.http.get<CatModel>('https://localhost:7143/api/cat/' + this.catId).subscribe(
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
    this.http.put<void>('https://localhost:7143/api/cat/' + this.catId, this.model).subscribe({
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
