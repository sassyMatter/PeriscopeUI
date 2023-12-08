import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Message } from '../models/message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {


  sendCanvasData(canvasData : string | undefined): Observable<any>{
  
    const url = `${environment.baseURL}/canvas/post-canvas-data`; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(url, canvasData, options);
  
  }

  saveAndRunSimulation(canvasData : string | undefined): Observable<any>{
  
    const url = `${environment.baseURL}/canvas/run-simulation`; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(url, canvasData, options);
  
  }

  constructor(private http : HttpClient) { }

  getServerResponse(){
    return this.http.get<Message>(`${environment.baseURL}/hello`);
  }

  
}

