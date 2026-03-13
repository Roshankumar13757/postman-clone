import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {

  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  private shouldIncludeCredentials(withCredentials?: boolean): boolean {
    return withCredentials ?? false;
  }

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });

  }

  get<T>(endpoint: string, withCredentials?: boolean): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
      withCredentials: this.shouldIncludeCredentials(withCredentials)
    });
  }

  post<T>(endpoint: string, body: unknown, withCredentials?: boolean): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, {
      headers: this.getHeaders(),
      withCredentials: this.shouldIncludeCredentials(withCredentials)
    });
  }

  put<T>(endpoint: string, body: unknown, withCredentials?: boolean): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, {
      headers: this.getHeaders(),
      withCredentials: this.shouldIncludeCredentials(withCredentials)
    });
  }

  delete<T>(endpoint: string, withCredentials?: boolean): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
      withCredentials: this.shouldIncludeCredentials(withCredentials)
    });
  }

}