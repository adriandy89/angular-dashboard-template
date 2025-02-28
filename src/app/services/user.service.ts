import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterUser, IUser } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  create(registerForm: IRegisterUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.apiUrl + '/register', registerForm);
  }
}
