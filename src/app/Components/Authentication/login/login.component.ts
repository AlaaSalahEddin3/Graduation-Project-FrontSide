import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IuserLogin } from 'src/app/Models/IuserLogin';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
   showError: boolean;
  private _returnUrl: string;
  constructor(private authService:AuthenticationService, private _router: Router, private _route: ActivatedRoute) { }
  ngOnInit(): void {
   this.loginForm = new FormGroup({
      UserName: new FormControl("", [Validators.required]),
      PasswordHash: new FormControl("", [Validators.required])
    })
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }
public LoginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = { ...loginFormValue };
    const userForAuth: IuserLogin = {
      UserName: login.UserName,
      PasswordHash: login.PasswordHash
    };
    this.authService.loginUser(userForAuth)
      .subscribe(res=> {
        localStorage.setItem("token", res.token);
        localStorage.setItem("logged","true");
        this._router.navigate([this._returnUrl]);
      },
        (error) => {
          this.errorMessage ='Check user name or Password';
          this.showError = true;
        });
  };


}
