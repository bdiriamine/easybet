import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  profileForm: FormGroup;
  changePasswordForm: FormGroup;
  username: string;
  confirmed = true;

  constructor(
    private UserServ: UserService,
    private localStorageServ: LocalstorageService,
    private toasterServ: ToastrService) { }

  ngOnInit(): void {
    this.username = this.localStorageServ.getItem('username');
    this.profileForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      b_date: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      country: new FormControl('')
    })

    this.changePasswordForm = new FormGroup({
      old_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required])
    })
    this.getUserDetails();
  }


  getUserDetails() {
    this.UserServ.getUser().subscribe((res: any) => {
      this.profileForm.controls['firstname'].setValue(res.data['firstname']);
      this.profileForm.controls['lastname'].setValue(res.data['lastname']);
      this.profileForm.controls['email'].setValue(res.data['email']);
      this.profileForm.controls['country'].setValue(res.data['country']);
      this.profileForm.controls['phone'].setValue(res.data['phone']);
      this.profileForm.controls['b_date'].setValue(res.data['date_of_birth']);
    })
  }

  changePassword() {
    if (this.changePasswordForm.controls['new_password'].value !== this.changePasswordForm.controls['confirm_password'].value) this.confirmed = false;
    else this.confirmed = true;
    if (this.confirmed) {
      this.UserServ.changePassword(this.changePasswordForm.controls['old_password'].value, this.changePasswordForm.controls['new_password'].value).subscribe(
        (res: any) => {
          this.toasterServ.success(res.message, 'Error')
        },
        error => {
          this.toasterServ.error(error.error.message, 'Error')
        }
      )
    } else {
      this.toasterServ.error('Please confirm password first', 'Oops')
    }

  }

}
