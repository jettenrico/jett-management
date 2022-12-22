import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav-brand',
  templateUrl: './nav-brand.component.html',
  styleUrls: ['./nav-brand.component.css']
})
export class NavBrandComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  onLogout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn():boolean{
    return this.loginService.isUserLoggedIn();
  }
}
