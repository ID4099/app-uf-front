import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UfConverterService } from './uf-converter.service';

@Component({
  selector: 'app-uf-converter',
  templateUrl: './uf-converter.component.html',
  styleUrl: './uf-converter.component.css',

})
export class UfConverterComponent {

  activityDate: string = '';
  currentUfValue: number = 0;
  ufHowmany: number = 1;
  conversion: any;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService,
    private readonly ufConverterService: UfConverterService
  ){

    this.conversion = {
      activityDate: 'YYYY-MM-DD',
      ufValue: 0,
      ufHowMany: 0,
      convertionAmount: 0,
      userType: [ "" ],
    }
  }

  async onSubmit(form: NgForm){
    const { activityDate: { year, month, day } } = form.value;
    
    this.activityDate = `${year}-${month}-${day}`;
    this.ufHowmany = form.value.ufHowmany;

    await this.getCurrentUfByDate(year, month, day);
  }

  async getCurrentUfByDate(year: number, month: number, day: number){
    const params = new HttpParams({
      fromObject: {
        apikey: '66a23f9065cab137fe5e6f01353245bab0026aff',
        formato: 'json'
      }
    })

    await this.httpClient.get<any>(`https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/${year}/${month}/dias/${day}`, { params }).subscribe(
      (response) => {
        const { Valor } = response.UFs[0]
        const [ intValueString, decValueString ] = Valor.split(',')
        this.currentUfValue = parseFloat(`${intValueString.replace(/\./g, '')}.${decValueString}`);
        this.conversion = {
          activityDate: this.activityDate,
          ufValue: this.currentUfValue,
          ufHowMany: this.ufHowmany,
          convertionAmount: this.ufHowmany * this.currentUfValue,
          userType: [ this.cookieService.get('userType') ],
        }
        this.ufConverterService.addConvertion(this.conversion);
      }
    );
  }

  isAdmin(){
    const userType = this.cookieService.get('userType')
    if( userType === 'ADMIN') return true;
    else return false;
  }

}
