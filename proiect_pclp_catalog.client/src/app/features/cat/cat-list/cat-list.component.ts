import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CatModel } from '../../../models/cat.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html'
})
export class CatListComponent implements OnInit {
  public catList: CatModel[] = [];

  constructor(public auth: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getCatList();
  }

  getCatList() {
    this.http.get<CatModel[]>('https://localhost:7143/api/cat').subscribe(
      (result) => {
        this.catList = result;
      }, (err) => {
        console.error(err);
      }
    )
  }

  editionCat(catId: number) {
    this.router.navigate(['categories/cat/update/' + catId]);
  }

  deleteCat(catId: number) {
    let i = confirm('Are you sure you are willing to delete the cat with the ID: ' + catId);
    if (i) {
      this.http.delete('https://localhost:7143/api/cat/' + catId).subscribe({
        next: (response) => {
          console.log(response);
          this.catList = this.catList.filter(cat => cat.id !== catId);

        }, error: (err) => {
          console.error(err);
        }, complete: () => {

        }
      })
    }
  }
}
