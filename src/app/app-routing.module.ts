import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasCoreComponent } from './canvas-core/canvas-core.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  // {path: '', redirectTo: 'hello-world'},
  {path: 'home', component : CanvasCoreComponent},
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  // declarations : [
  //   HelloWorldComponent
  // ],

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
