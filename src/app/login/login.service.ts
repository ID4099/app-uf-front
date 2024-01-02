import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from "jwt-decode";
import { environment } from '../../environments/environment.development';

@Injectable()//**default args ** {providedIn: 'root'}
export class LoginService {

  private isLogged: boolean;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private cookie: CookieService
  ) {
    this.isLogged = false

  }

  async signin(user: string, password: string): Promise<any>{
    const credentials = { user, password }
    await this.httpClient.post<any>(`${environment.serverAppUrl}/user/signin`, credentials ).subscribe(
      (response)=>{
        this.cookie.set('token', response.access_token);
        this.cookie.set('isLogged', 'success');
        const { roles: [ { type } ] } = jwt_decode.jwtDecode<any>(response.access_token);
        this.cookie.set('userType', type)
        this.isLogged = true;


        this.router.navigate(['/']);
      },
      (error) => { console.log(error) }
    );
  }
  getToken = () => this.cookie.get('token');
  getIsLogged = () => this.cookie.check('isLogged');
  
  loguot = () => {
    /** Logout logic */
    this.cookie.deleteAll();
    this.router.navigate(['/login']);
    // window.location.reload();
  }
}
