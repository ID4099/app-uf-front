import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly loginService: LoginService,
    private readonly cookie: CookieService
  ){}

  ngOnInit(): void {
  }
  logout(){
    this.loginService.loguot();
  }

  isLogged(){
    const islogged: boolean = false;
    if(this.loginService.getIsLogged()) return true
    else return false;
  }

}
