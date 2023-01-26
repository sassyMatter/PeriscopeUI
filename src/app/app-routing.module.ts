import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { ConverterComponent  } from './converter/converter.component';

const routes: Routes = [
  {path: '', redirectTo: 'hello-world'},
  {path: 'hello-world', component : HelloWorldComponent},
  {path: 'converter', component: ConverterComponent}
];

@NgModule({
  // declarations : [
  //   HelloWorldComponent
  // ],

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
