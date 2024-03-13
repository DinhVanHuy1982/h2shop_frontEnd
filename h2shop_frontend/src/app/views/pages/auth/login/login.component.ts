import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { environment } from 'src/environment/environment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  api = environment.API_GATEWAY_ENDPOINT;
  constructor(private fromControl:FormControl,
    private fb : FormBuilder,
    private loginService: LoginService,
    private toast: ToastrService,
    private translate : TranslateService
    ){
      this.buildForm();
    }

    formLogin : FormGroup = this.fb.group({
      userName: new FormControl('abc',[Validators.required, Validators.maxLength(20)]),
      passWord: new FormControl('abc',[Validators.required, Validators.maxLength(20)])
    });
    buildForm(){
      this.formLogin = this.fb.group({
        userName: new FormControl('abc',[Validators.required, Validators.maxLength(20)]),
        passWord: new FormControl('abc',[Validators.required, Validators.maxLength(20)])
      })
    }
    login(){
      this.loginService.getAuthenticate(this.formLogin.value).subscribe((data) =>{
          
      }, eror =>{
        this.toast.error(this.translate.instant("SYSTEM.CONNECT_FAILURE"))
      })
    }

}
