import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { CatListComponent } from './features/cat/cat-list/cat-list.component';
import { AddUserComponent } from './features/user/add-user/add-user.component';
import { AddCatComponent } from './features/cat/add-cat/add-cat.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UpdateCatComponent } from './features/cat/update-cat/update-cat.component';
import { UpdateUserComponent } from './features/user/update-user/update-user.component';
import { MainComponent } from './features/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'categories/user',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories/user/add',
    component: AddUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories/user/update/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories/cat',
    component: CatListComponent
  },
  {
    path: 'categories/cat/add',
    component: AddCatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories/cat/update/:id',
    component: UpdateCatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
