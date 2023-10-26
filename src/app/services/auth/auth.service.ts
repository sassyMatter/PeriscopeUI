import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://localhost:4200' // Set this to your server's origin
})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorageService : TokenStorageService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'sign-in', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'sign-up', {
      username,
      email,
      password
    }, httpOptions);
  }

  // ideally should check token validity and everything, but let's just keep it for backend,
  //  mere existence of token is enough here since storage would be cleard 
  isLoggedIn(){
    if(this.tokenStorageService.getToken()){
      return true;
    }
    return false;
  }

  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}