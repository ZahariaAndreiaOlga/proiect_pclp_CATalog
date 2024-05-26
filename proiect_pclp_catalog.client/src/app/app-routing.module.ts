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
import { UnauthorizedComponent } from './features/unauthorized/unauthorized.component';
import { ViewCatComponent } from './features/cat/view-cat/view-cat.component';
import { SignupComponent } from './features/signup/signup.component';
import { UserAppointmentComponent } from './features/appointment/user/user-appointment.component';
import { ListAppointmentComponent } from './features/appointment/admin/list-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'categories/user',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: ['Admin'] }
  },
  {
    path: 'categories/user/add',
    component: AddUserComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: ['Admin'] }
  },
  {
    path: 'categories/user/update/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: ['Admin'] }
  },
  {
    path: 'categories/user/appointment',
    component: UserAppointmentComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: ['User'] }
  },
  {
    path: 'categories/cat',
    component: CatListComponent
  },
  {
    path: 'categories/cat/v/:id',
    component: ViewCatComponent
  },
  {
    path: 'categories/cat/add',
    component: AddCatComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: ['Admin', 'Foster'] }
  },
  {
    path: 'categories/cat/update/:id',
    component: UpdateCatComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: ['Admin', 'Foster'] }
  },
  {
    path: 'categories/admin/appointment',
    component: ListAppointmentComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: ['Admin'] }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
