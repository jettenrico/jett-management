import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILogin, ILoginToken } from 'src/app/interfaces/i-login';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  lastUrl:string | null = null;
  defaultUrl:string = "dashboard";
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
    private activatedRoute: ActivatedRoute){}

  onLogin(){
    this.loginService.login(this.user)
      .subscribe(
        (response: ILoginToken) => {
          this.storageService.save('TOKEN', response.token);
          this.storageService.save('USERNAME', response.username);
          this.storageService.save('PHOTO_PROFILE', response.image)
          if(this.lastUrl){
            this.router.navigate(['this.lastUrl']);
          }else{
            this.router.navigate(['this.defaultUrl'])
          }
        }
      )
  }
}
