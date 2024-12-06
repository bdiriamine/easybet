import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private authServ: AuthService,
    private modalService: NgbModal,
    private toaserServ: ToastrService) { 
    }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login() {    
    if (this.loginForm.value.username !== '' && this.loginForm.value.password !== '') {
      this.authServ.signin(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
      this.close();
    } else {
      this.toaserServ.error('Username or password are empty!', 'Error')
    }
  }

  close() {
    this.modalService.dismissAll()
  }

}
