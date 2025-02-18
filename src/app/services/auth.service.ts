import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loadUser(): Observable<User | null> {
    return of(
      null
      // { id: 1, name: 'John', email: 'asd@ll.cc' }
    ).pipe(delay(3000));
  }

  login(email: string, password: string): Observable<User> {
    console.log('login', email);

    return of({ id: 1, name: 'John', email }).pipe(delay(2000));
  }
}
