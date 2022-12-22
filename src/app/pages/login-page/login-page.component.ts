import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILogin, ILoginToken } from 'src/app/interfaces/i-login';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  lastUrl:string | null = null;
  defaultUrl:string = "dashboard";
  requiredForm:FormGroup;
  
  user: ILogin = {
    username: "",
    password: ""
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      params => {
        this.lastUrl = params.get('lastUrl');
      }
    )
  }

constructor(private loginService: LoginService, private storageService: StorageService, private router: Router,
    private activatedRoute: ActivatedRoute, private toasterService: ToasterService){
      this.requiredForm = new FormGroup({
        username:new FormControl(this.user.username, [
          Validators.required,
          Validators.minLength(6)
        ]),
        password:new FormControl(this.user.password,[
          Validators.required,
          Validators.minLength(6)
        ])
      })
    }

  private handleError(error: HttpErrorResponse){
    return throwError(() => new Error('Something bad happened, please try again later!'))
  }

  onLogin(){
    this.loginService.login(this.user)
    .pipe(
      catchError(this.handleError)
    )
      .subscribe(
        (response: ILoginToken) => {
          this.storageService.save('TOKEN', response.token);
          this.storageService.save('USERNAME', response.username);
          this.storageService.save('PHOTO_PROFILE', response.image);
          if(this.lastUrl){
            this.router.navigate([this.lastUrl]);
          }else{
            this.router.navigate([this.defaultUrl])
          }
        },
        (error:any) =>{
          this.toasterService.showToast = true;
          this.toasterService.condition = false;
          this.toasterService.message = 'Login gagal, silahkan coba kembali!';
        }
      )
  }
}
