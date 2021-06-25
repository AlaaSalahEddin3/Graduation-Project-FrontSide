import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Data, Router } from '@angular/router';
import { combineAll } from 'rxjs/operators';
import { IuserRegister } from 'src/app/Models/IuserRegister';
import { User } from 'src/app/Models/user';
import { AuthenticationService } from 'src/app/Services/authentication.service';
//import { LoginComponent } from '../Authentication/login/login.component';
//import { RegisterComponent } from '../Authentication/register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isUserAuthenticated:boolean;
  user:any;
   Iuser:object;
   name:string;
   currentDate=new Date().getHours(); 
   token:any;
   exp:string;
   lasttime:number;
   expire:string;
   numOfItems:number
  //@ViewChild(RegisterComponent) register:RegisterComponent;
  constructor(private _authService:AuthenticationService,private _router: Router)
   { 
   
   }
  ngOnInit(): void 
  {
    if(localStorage.getItem('current_user')){
  let current_user:User=JSON.parse(localStorage.getItem('current_user')||'{}')
  this.numOfItems=current_user.products.length
    }
    else
    {
      this.numOfItems=0
    }
   // console.log(this.currentDate);

       //this.token=localStorage.getItem('token');
       //let date=JSON.parse(this.token);
      // this.exp=date.expiration;
      //  this.expire=this.exp.slice(11,13)
       // this.lasttime=this.expire- this.currentDate;
       //console.log(this.exp.slice(11,13));
      // console.log(typeof(this.exp));
    if(localStorage.getItem("logged")!=null&&localStorage.getItem("logged")=="true")
    {
       this.isUserAuthenticated=true;
       this.user=localStorage.getItem('user');
       let Iuser=JSON.parse(this.user);
       this.name=Iuser.userName; 
    }
    else if(localStorage.getItem("logged")!=null&&localStorage.getItem("logged")=="false" )
    {
      this.isUserAuthenticated=false;
    }
   
  }
  public logout = () => {
    this._authService.logout();
    localStorage.setItem("logged","false");
    this.isUserAuthenticated=false;
    this._router.navigate(["/"]);
  }
  isUserAdmin():boolean{
    let role = this._authService.getRole();
    return (role == 'Admin') ? true : false
  } 
}
