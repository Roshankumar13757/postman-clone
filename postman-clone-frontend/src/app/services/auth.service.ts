import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //http://localhost:5000/api/auth/signup

  private apiUrl = "http://localhost:5000/api/";

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/signup`, data);
  }

}