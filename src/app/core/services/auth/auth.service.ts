import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  userData: any;
  signUp(data:object):Observable<any>{
   return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)

  }
  signIn(data:object):Observable<any>{
   return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }

  getUesrData():void{
    this.userData = jwtDecode(localStorage.getItem('myToken')!)    
     console.log(this.userData);
     

  }
  
}
