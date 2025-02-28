import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  list(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/clients', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
