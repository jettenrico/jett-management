import { Component } from '@angular/core';
import { IUser, IUserWrapper } from 'src/app/interfaces/i-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  users:Array<IUser> = [];
  user:IUser = {} as IUser;
  showMore:boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.onAll();
  }

  onAll():void{
    this.userService.all().subscribe(
      (response: IUserWrapper) => {
        this.users = response.users;
      }
    )
  }

  showToggle(){
    this.showMore = !this.showMore
  }

  showDetailUser(u: IUser):void{
    this.user = u;
  }
}
