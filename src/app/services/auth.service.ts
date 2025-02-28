import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { ILoginResponse, ILoginUser, IUser } from '../models';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  login({ username, password }: ILoginUser): Observable<ILoginResponse> {
    // return this.httpClient.post<ILoginResponse>(this.apiUrl + '/login', loginForm);
    if (username !== 'admin@test.com' || password !== 'As-12345') return throwError(() => new Error()) as any;
    return of<ILoginResponse>(
      {
        token
          : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1hcmNoaW5hIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjIwNzQwNjI4LCJleHAiOjE2MjA3NDQyMjh9',
        user: {
          id: "eyJkFkbWluIiwiaWF0IjoxNjIwNzQwNj01",
          username: "admin",
          role: "root"
        }
      }
    ).pipe(delay(2000));
  }

  logout() {
    return this.httpClient.post(this.apiUrl + '/logout', {}, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  loadUser(): Observable<IUser | null> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(null);
    }
    return this.httpClient.get<IUser>(this.apiUrl + '/profile', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

}
