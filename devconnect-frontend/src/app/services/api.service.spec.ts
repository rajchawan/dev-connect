import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  getProfile(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  getPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`);
  }
} 