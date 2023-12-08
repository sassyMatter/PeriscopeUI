import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



const API_URL = `${environment.baseURL}/hello`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getHomeContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

}
