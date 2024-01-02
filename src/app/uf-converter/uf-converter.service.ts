import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

interface ConversionInterface {
  activityDate: string
  ufValue: number
  ufHowMany: number
  convertionAmount: number
  userType: string[]
}

@Injectable({
  providedIn: 'root'
})
export class UfConverterService {

  serverAppUrl: string;
  private token: string;

  constructor(
    private httpClient: HttpClient,
    private readonly cookieService: CookieService
  ) {
    this.serverAppUrl = 'http://localhost:3000';
    this.token = this.cookieService.get('token');
  }

  async addConvertion(conversion: ConversionInterface): Promise<any>{
    const headers = new HttpHeaders().set('access_token', this.token);
    await this.httpClient.post<any>(`${this.serverAppUrl}/uf-case/create`, conversion, { headers }).subscribe();
  }
}
