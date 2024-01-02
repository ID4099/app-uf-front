import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { UfConverterComponent } from './uf-converter/uf-converter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConversionHistoryComponent } from './conversion-history/conversion-history.component';
import { HomeComponent } from './home/home.component';
import { LoginService } from './login/login.service';
import {CookieService} from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UfConverterComponent,
    ConversionHistoryComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoginModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
