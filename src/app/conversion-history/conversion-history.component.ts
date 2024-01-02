import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-conversion-history',
  templateUrl: './conversion-history.component.html',
  styleUrl: './conversion-history.component.css'
})
export class ConversionHistoryComponent implements OnInit {
    conversions: any;
    private token: string;

    constructor(
        private router: Router,
        private readonly httpClient: HttpClient,
        private readonly cookieService: CookieService,
    ){
        this.token = this.cookieService.get('token');
    }

    async ngOnInit(): Promise<void> {
        const userType = this.cookieService.get('userType');
        if(userType === 'ADMIN') {
            await this.httpClient.get(`${environment.serverAppUrl}/uf-case/bring/all`, { headers: { access_token: this.token } }).subscribe(
                (response: any) => {
                    this.conversions = response;
                }
            )
        }
    }

    isAdmin(){
        const userType = this.cookieService.get('userType');
        if(userType === 'ADMIN') return true;
        else return false;
    }

    async downloadFile() {
        const filename = 'History'
        const headers = new HttpHeaders().set('access_token', this.token);
        const data = {
            convertions: this.conversions
        }
        this.httpClient.post(`${environment.serverAppUrl}/uf-case/download/file`, data, { headers, responseType: 'blob' as 'json' }).subscribe(
            (response: any) =>{
                let dataType = response.type;
                let binaryData = [];
                binaryData.push(response);
                let downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
                
                downloadLink.setAttribute('download', filename);
                document.body.appendChild(downloadLink);
                downloadLink.click();
            }
        )
      }

}
