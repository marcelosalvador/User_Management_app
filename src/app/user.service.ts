import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  addUser(user: any): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(url, user, { headers });
  }
}

