import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShopValidator } from 'src/app/validator/shop-validator';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isAdmin!:boolean;
  errorMessage:string ='';


  constructor(private formBuilder: FormBuilder,
            private authService: AuthService,
            private router: Router) {

   }

  ngOnInit(): void {
    this.myFormGroup();
  }


  myFormGroup():void{
    this.loginFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        username: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidator.notOnlyWhiteSpace]),
        password: new FormControl('',  [Validators.required, Validators.minLength(2),ShopValidator.notOnlyWhiteSpace] ),

      }),
    })
  }

  OnSubmit():void{
    let user = this.loginFormGroup.get('user')?.value;
    let username =  user['username'];
    let password =  user['password'];


    if(this.authService.login(username, password) !== undefined){
      this.authService.isAdmin.subscribe(
        data => this.isAdmin = data
      )

      if(this.isAdmin == true){
        this.router.navigateByUrl('/admin/dashboard');
        return;
      }

      this.router.navigateByUrl('/produts');
    }else {
      this.errorMessage = 'Please enter a correct username and Password';
    }

  }

}
