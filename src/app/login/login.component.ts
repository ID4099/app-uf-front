import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  user: string = '';
  password: string = '';

  constructor(
    private readonly loginService: LoginService
  ){}

  ngOnInit(): void {
    
  }
  async onSubmit(form: NgForm) {
    this.user = form.value.user;
    this.password = form.value.password;
    await this.loginService.signin(this.user, this.password);
  }
}
