import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name: string = '';
  lastname: string = '';
  user: string = '';
  password: string = '';

  constructor(private readonly registerService: RegisterService){}

  async onSubmit(form: NgForm){
    this.name = form.value.name;
    this.lastname = form.value.lastname;
    this.user = form.value.user;
    this.password = form.value.password;

    const signupData = { 
      name: this.name,
      lastname: this.lastname,
      user: this.user,
      password: this.password
    };
    await this.registerService.signup(signupData);
  }
}
