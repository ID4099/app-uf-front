import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.development';

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

  private token: string;

  constructor(
    private httpClient: HttpClient,
    private readonly cookieService: CookieService
  ) {
    this.token = this.cookieService.get('token');
  }

  async addConvertion(conversion: ConversionInterface): Promise<any>{
    const headers = new HttpHeaders().set('access_token', this.token);
    await this.httpClient.post<any>(`${environment.serverAppUrl}/uf-case/create`, conversion, { headers }).subscribe();
  }
}
