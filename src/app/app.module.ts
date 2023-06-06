import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasCoreComponent } from './canvas-core/canvas-core.component';
import {HttpClientModule } from '@angular/common/http';
import { ConverterComponent } from './converter/converter.component'
import { ComponentProvider } from './services/componentProvider';


@NgModule({
  declarations: [
    AppComponent,
    CanvasCoreComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    

  ],
  providers: [ComponentProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
