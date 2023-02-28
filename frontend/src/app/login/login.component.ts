import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ApiServiceService } from '../api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UpPasswordComponent } from '../up-password/up-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup
  loginError !: string
  autheticateUrl : string = `https://localhost:44321/api/UserLogin/authentication`;
  constructor(
    private router : Router,
    private apiService : ApiServiceService,
    private fb : FormBuilder,
    private ngxSpinner : NgxSpinnerService,
    private dialog : MatDialog
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName : ['', [Validators.required]],
      password : ['', [Validators.required]]
    });
  }
 
  onClickLogin(){
    this.apiService.userAutheticate(`${this.autheticateUrl}/${this.loginForm.value.userName}/${this.loginForm.value.password}`);
    this.ngxSpinner.show();
    setTimeout(() => {
      if(sessionStorage.getItem('isUserValid') === 'true' && sessionStorage.getItem('userTypeID') === '986123'){
        this.router.navigate(['distributer'])

      }else if(sessionStorage.getItem('isUserValid') === 'true' && sessionStorage.getItem('userTypeID') === '986125'){
        this.router.navigate(['authorizer'])

      } else if(sessionStorage.getItem('isUserValid') === 'true' && sessionStorage.getItem('userTypeID') === '986126'){
        this.router.navigate(['warehouse'])
        
      } else if(sessionStorage.getItem('isUserValid') === 'true' && sessionStorage.getItem('userTypeID') === '986124'){
        this.router.navigate(['admin'])
      } else {
        this.loginError == 'Enter Valid Credentials'
      }
      this.ngxSpinner.hide();
    }, 1500)
  }

  onClickOpenRegister(){
    this.dialog.open(RegisterComponent, {
      height : '98%',
      width : '45%'
    })
  }

  onClickPassDialog(){
    this.dialog.open(UpPasswordComponent, {
      height : '60%',
      width : '35%'
    })
  }
}
