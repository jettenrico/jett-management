import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user';
import { UserService } from 'src/app/services/user.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() user:IUser = {} as IUser;
  showMore:boolean = false;
  showToast:boolean = false;
  isConfirmDelete:boolean = false;

  constructor(private userService: UserService, private toasterService: ToasterService) {}
  
  ngOnInit(): void {
    
  }

  showToggle(){
    this.showMore = !this.showMore
  }

  cancel():void{
    this.user = {} as IUser;
    this.showMore = false;
  }

  onCreate(){
    this.userService.create(this.user)
      .subscribe(
        (response: IUser) => {
          this.showMore = false;
          this.user = {} as IUser;
          this.toasterService.showToast = true;
          this.toasterService.message = `Berhasil menyimpan data ${response.firstName} ${response.lastName}, Terima kasih!`;
        }
      )
  }

  onUpdate(){
    this.userService.update(this.user)
      .subscribe(
        (response: IUser) => {
          this.showMore = false;
          this.user = {} as IUser;
          this.toasterService.showToast = true;
          this.toasterService.message = `Berhasil update data dengan ID: ${response.id}`;
        }
      )
  }

  onDelete(){
    this.userService.delete(this.user)
    .subscribe(
      (response: IUser) => {
        this.showMore = false;
        this.isConfirmDelete = false;
        this.user = {} as IUser;
        this.toasterService.showToast = true;
        this.toasterService.message = `Berhasil delete data dengan ID: ${response.id}`;
      }
    )
  }
}
