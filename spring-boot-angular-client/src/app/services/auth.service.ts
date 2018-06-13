import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Auth } from '../model/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = '/service/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<Auth> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    const data = new URLSearchParams();
    data.append('username', username);
    data.append('password', password);

    return this.http.post<Auth>(`${this.authUrl}/signin`, data.toString(), httpOptions)
      .pipe(
        tap(auth => {
          if (auth.token) {
            localStorage.setItem('access_token', auth.token);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

  register(user: User): Observable<Auth> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Auth>(`${this.authUrl}/signup`, user, httpOptions)
      .pipe(
        tap(auth => {
          if (auth.token) {
            localStorage.setItem('access_token', auth.token);
          }
        })
      );
  }

}
