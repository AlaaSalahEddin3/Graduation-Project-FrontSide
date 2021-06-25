import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import {  IuserRegister } from '../Models/IuserRegister';
import { IuserLogin } from '../Models/IuserLogin';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService 
{
//UrlRegister='http://localhost:56568'; 
  //UrlLogin ='http://localhost:56568';
   token :any;  
  header : any;  
  userID:string;
  userName:string;
  Role:string;
    private _authChangeSub = new Subject<boolean>()
    public authChanged = this._authChangeSub.asObservable();
  constructor(private http : HttpClient,private router: Router)
   {
     
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
    
    }

    loginUser(login : IuserLogin)
    { 
   
        return this.http.post(`${environment.apiUrl}/Login`,login).pipe(map(res => {
         this.setSession(res);
      }));
    } 
     RegisterUser(register:IuserRegister)  
     { 
      
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<IuserRegister[]>(`${environment.apiUrl}/Register`,register ,httpOptions)
     } 
     
     private setSession(Result:any) {
      //const expiresAt = moment().add(authResult.expiresIn,'second');
      const expires = Result.expiration;
      localStorage.setItem('token', Result.token);
      localStorage.setItem("expires_at", JSON.stringify(expires));//.valueOf()) );
  } 
    
 public logout = () => 
 {
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
       // this.router.navigate(['/Login']);
  }
  
 public isLoggedIn() 
 {
      if(localStorage.getItem('token')) 
      {
          this.token = localStorage.getItem('token');
          let jwtData =this.token.split('.')[1]

          let decodedJwtJsonData = window.atob(jwtData)

          let decodedJwtData = JSON.parse(decodedJwtJsonData)

          let expirationDateInMills = decodedJwtData.exp * 1000;

          let todayDateInMills = new Date().getTime();

          if (expirationDateInMills >= todayDateInMills)
              return true;
          
      }
      return false;
  }
  getUserId(){
        if(localStorage.getItem('token')){
           this.token = localStorage.getItem('token');

            let jwtData =this.token.split('.')[1]

            let decodedJwtJsonData = window.atob(jwtData)

            let decodedJwtData = JSON.parse(decodedJwtJsonData)
            console.log(decodedJwtData);
            this.userID =decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
            return this.userID;
        }
        return null;
    }
    
  getUsername(){
        if(localStorage.getItem('token')){
           this.token = localStorage.getItem('token');
            let jwtData =this.token.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)
            this.userName =decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            console.log(this.userName);
            return this.userName;
        }
        return null;
    }
    getRole(){
      if(localStorage.getItem('token')){
         this.token = localStorage.getItem('token');
          let jwtData =this.token.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          let decodedJwtData = JSON.parse(decodedJwtJsonData)
          this.Role =decodedJwtData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          console.log(this.Role);
          return this.Role;
      }
      return null;
  }
}


