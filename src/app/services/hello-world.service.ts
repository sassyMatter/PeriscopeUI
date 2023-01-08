import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {

  constructor(private http : HttpClient) { }

  getServerResponse(){
    return this.http.get<Message>("http://localhost:8080/hello");
  }
}

