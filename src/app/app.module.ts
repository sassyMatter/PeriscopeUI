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
import { CreateProjectComponent } from './create-project/create-project.component';
import { ClickOutsideDirective } from '../customComponents/clickOutside.directive';
import { GetAllProjectsComponent } from './get-all-projects/get-all-projects.component';
import { ProjectPageComponent } from './project-page/project-page.component';

// import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule} from '@angular/material/autocomplete';



import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CanvasCoreComponent,
    DialogComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    CreateProjectComponent,
    ClickOutsideDirective,
    GetAllProjectsComponent,
    ProjectPageComponent
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
    // MatSidenavContainer,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCardModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule

  ],
  providers: [ComponentProvider, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
