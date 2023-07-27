import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {


  sendCanvasData(canvasData : string | undefined): Observable<any>{
  
    const url = 'http://localhost:8080/canvas/post-canvas-data'; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(url, canvasData, options);
  
  }

  saveAndRunSimulation(canvasData : string | undefined): Observable<any>{
  
    const url = 'http://localhost:8080/canvas/run-simulation'; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(url, canvasData, options);
  
  }

  constructor(private http : HttpClient) { }

  getServerResponse(){
    return this.http.get<Message>("http://localhost:8080/hello");
  }

  
}

