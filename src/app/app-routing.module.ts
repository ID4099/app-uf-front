import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UfConverterComponent } from './uf-converter/uf-converter.component';
import { ConversionHistoryComponent } from './conversion-history/conversion-history.component';
import { LoginGuard } from './login/login.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: '', canActivate: [ LoginGuard ],  component: UfConverterComponent },
  { path: 'conversion/history', canActivate: [ LoginGuard ], component: ConversionHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
