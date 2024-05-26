import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatListComponent } from './features/cat/cat-list/cat-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { AddUserComponent } from './features/user/add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { AddCatComponent } from './features/cat/add-cat/add-cat.component';
import { LoginComponent } from './features/login/login.component';

import { JwtModule } from '@auth0/angular-jwt';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UpdateCatComponent } from './features/cat/update-cat/update-cat.component';
import { UpdateUserComponent } from './features/user/update-user/update-user.component';
import { MainComponent } from './features/main/main.component';
import { UnauthorizedComponent } from './features/unauthorized/unauthorized.component';
import { SignupComponent } from './features/signup/signup.component';
import { ViewCatComponent } from './features/cat/view-cat/view-cat.component';
import { UserAppointmentComponent } from './features/appointment/user/user-appointment.component';
import { ListAppointmentComponent } from './features/appointment/admin/list-appointment.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    CatListComponent,
    NavbarComponent,
    UserListComponent,
    AddUserComponent,
    AddCatComponent,
    UpdateCatComponent,
    UpdateUserComponent,
    LoginComponent,
    MainComponent,
    UnauthorizedComponent,
    SignupComponent,
    ViewCatComponent,
    UserAppointmentComponent,
    ListAppointmentComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://localhost:7143"],
        disallowedRoutes: ["https://localhost:7143/api/login"],
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
