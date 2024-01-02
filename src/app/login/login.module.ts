import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { LoginGuard } from './login.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LoginService,
    LoginGuard
  ]
})
export class LoginModule { }
