import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private isLogged: boolean;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) {
    this.isLogged = false
   }

  async signup( data : { name: string, lastname: string, user: string, password: string }){
    await this.httpClient.post<any>(`${environment.serverAppUrl}/user/signup`, data ).subscribe(
      (response)=>{
        this.cookieService.set('token', response.access_token);
        this.cookieService.set('isLogged', 'success');
        const { roles: [ { type } ] } = jwt_decode.jwtDecode<any>(response.access_token);
        this.cookieService.set('userType', type)
        this.isLogged = true;


        this.router.navigate(['/']);
      },
      (error) => { console.log(error) }
    );
  }
}
