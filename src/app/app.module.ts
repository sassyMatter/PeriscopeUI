import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasCoreComponent } from './canvas-core/canvas-core.component';
import {HttpClientModule } from '@angular/common/http';
import { ConverterComponent } from './converter/converter.component'
import { ComponentProvider } from './services/componentProvider';
import { DialogComponent } from './dialog/dialog.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';



@NgModule({
  declarations: [
    AppComponent,
    CanvasCoreComponent,
    ConverterComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // CodemirrorModule,

    

  ],
  providers: [ComponentProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
