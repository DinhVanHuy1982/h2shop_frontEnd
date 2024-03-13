import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  api = environment.API_GATEWAY_ENDPOINT;
  constructor(private httpClinet: HttpClient) { }

  public getAuthenticate(body:any){
    return this.httpClinet.post(this.api+'authenticate',body);
  }
}
