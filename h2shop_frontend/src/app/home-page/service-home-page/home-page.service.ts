import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  testApi(){
    console.log(this.API);
    
  }
  constructor() { }
}
