import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LoginComponent } from '../Authentication/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isUserAuthenticated:boolean;
  @ViewChild(LoginComponent) login:LoginComponent;
  constructor(private _authService:AuthenticationService,private _router: Router)
   { 
   
   }
  ngOnInit(): void 
  {
     
    if(localStorage.getItem("logged")!=null&&localStorage.getItem("logged")=="true")
    {
      this.isUserAuthenticated=true;
    }
    else if(localStorage.getItem("logged")!=null&&localStorage.getItem("logged")=="false")
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

}
