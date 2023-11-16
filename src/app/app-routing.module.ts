import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasCoreComponent } from './canvas-core/canvas-core.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/auth/auth-gaurd.guard';
import { HomeComponent } from './home/home.component';
import { GetAllProjectsComponent } from './get-all-projects/get-all-projects.component';
import { ProjectPageComponent } from './project-page/project-page.component';
const routes: Routes = [
  // {path: '', redirectTo: 'hello-world'},
  {path: 'home', component : HomeComponent , canActivate : [AuthGuard]},
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate : [AuthGuard]},
  {path: 'projects', component: GetAllProjectsComponent,canActivate:[AuthGuard]},
  {path: 'projects/project1', component:ProjectPageComponent ,canActivate:[AuthGuard]}

];

@NgModule({
  // declarations : [
  //   HelloWorldComponent
  // ],

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
