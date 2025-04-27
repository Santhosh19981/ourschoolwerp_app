import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ApiEndPoint } from '../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangandparmisionService {


    constructor(public http: HttpClient) {}

    getLangandPermissionCall(value: string): Observable<any> {
        const token = localStorage.getItem('tokenKey');
        if (token) {
          const storageKey = 'langandpermissioncall' + value;
          return this.http.get(ApiEndPoint + 'langandpermissioncall/index/' + value);
        } else {
          // Return an empty observable if token is not available
          return new Observable(observer => {
            observer.error('No token found');
            observer.complete();
          });
        }
      }

      getUserProfile(): Observable<any> {
        const token = localStorage.getItem('tokenKey');
        if (token) {
          return this.http.get(ApiEndPoint + 'profile/index');
        } else {
          // Return an empty observable if token is not available
          return new Observable(observer => {
            observer.error('No token found');
            observer.complete();
          });
        }
      }

    }
