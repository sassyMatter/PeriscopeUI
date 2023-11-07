import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasCoreComponent } from './canvas-core/canvas-core.component';
import {HttpClientModule } from '@angular/common/http';
import { ComponentProvider } from './services/componentProvider';
import { DialogComponent } from './dialog/dialog.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authInterceptorProviders } from './services/auth/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { GetAllProjectsComponent } from './get-all-projects/get-all-projects.component';



@NgModule({
  declarations: [
    AppComponent,
    CanvasCoreComponent,
    DialogComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    GetAllProjectsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CodemirrorModule,
    BrowserAnimationsModule,
    MatChipsModule,
    NgFor,
    FormsModule,
    CdkDrag,

    

  ],
  providers: [ComponentProvider, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
