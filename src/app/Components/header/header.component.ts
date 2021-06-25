import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Data, Router } from '@angular/router';
import { combineAll } from 'rxjs/operators';
import { IuserRegister } from 'src/app/Models/IuserRegister';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LoginComponent } from '../Authentication/login/login.component';
import { RegisterComponent } from '../Authentication/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 public isLoggedIn:boolean = false;
  userName:any;
   Iuser:object;
   name:string;
  constructor(private _authService:AuthenticationService,private _router: Router)
   { 
   
   }
  ngOnInit(): void 
  {
    this.userName= this._authService.getUsername();
    console.log(this.userName);
    //this. isUserLoggedIn()
   // this.user=localStorage.getItem('user');
    //let Iuser=JSON.parse(this.user);
   //this.name=Iuser.userName; 
   /* if(localStorage.getItem("logged")!=null&&localStorage.getItem("logged")=="true")
    {
       this.isUserAuthenticated=true;
       this.user=localStorage.getItem('user');
       let Iuser=JSON.parse(this.user);
       this.name=Iuser.userName; 
    }
    else if(localStorage.getItem("logged")!=null&&localStorage.getItem("logged")=="false" )
    {
      this.isUserAuthenticated=false;
    }*/
   
  }
  public logout = () => {
    this._authService.logout();
   // localStorage.setItem("logged","false");
    //this.isUserAuthenticated=false;
   // this._router.navigate(["/"]);
  }
  public isUserLoggedIn():boolean{
    return this._authService.isLoggedIn();
  }

 
}
