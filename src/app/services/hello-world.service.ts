import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Message } from '../models/message';
import { environment } from 'src/environments/environment';
import { ProjectService } from '../project.service';

import { Project } from '../project-page/project';
@Injectable({
  providedIn: 'root'
})

export class HelloWorldService {
 
  constructor(private http : HttpClient,private projectservice:ProjectService) { }
  
 
  // sendCanvasData(canvasData : string | undefined): Observable<any>{
  //   //for testing
  //   const combinedData = {
  //     canvasData: canvasData
      
  //   };
  //   console.log("canvas data loading");
  //   const url = `${environment.baseURL}/canvas/post-canvas-data`;
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const options = { headers: headers };
  //   return this.http.post(url, combinedData,options);

  // }
  sendCanvasData(canvasData : string | undefined): Observable<Project>{
    //for testing
    if(canvasData!=null)
    this.projectservice.currentproject.canvasData=JSON.parse(canvasData);
    
    // const url = `${environment.baseURL}/canvas/post-canvas-data`;
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const options = { headers: headers };
    // return this.http.post(url, this.projectservice.currentproject,options);
    return this.projectservice.saveupdateprojects(this.projectservice.currentproject);
  }

  getCanvasData(){
    console.log("running");
    console.log(this.projectservice.currentproject);
    return this.http.get<string>(`${environment.baseURL}/canvas/get-canvas`);
  }

  saveAndRunSimulation(canvasData : string | undefined): Observable<any>{

    const url = `${environment.baseURL}/canvas/run-simulation`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(url, canvasData, options);

  }

  

  getServerResponse(){
    return this.http.get<Message>(`${environment.baseURL}/hello`);
  }


}

