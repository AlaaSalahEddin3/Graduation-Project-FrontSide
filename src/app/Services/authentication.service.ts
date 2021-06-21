import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import {  IuserRegister } from '../Models/IuserRegister';
import { IuserLogin } from '../Models/IuserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService 
{
  UrlRegister='http://localhost:56568'; 
  UrlLogin ='http://localhost:56568';
  token : string='';  
  header : any;  
  //envUrl:string;
    private _authChangeSub = new Subject<boolean>()
    public authChanged = this._authChangeSub.asObservable();
    
  constructor(private http : HttpClient)
   {
     
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
    
    }
    
    loginUser(login : IuserLogin):Observable<any>
    { 
   
        return this.http.post(this.UrlLogin+'/Login/',login);  
    } 
     RegisterUser(register:IuserRegister)  
     { 
      
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<IuserRegister[]>(this.UrlRegister+'/Register/',register ,httpOptions)
     }  
     public sendAuthStateChangeNotification=(isAuthenticated: boolean)=>
     {
        this._authChangeSub.next(isAuthenticated);
     }
     public logout = () => {
        localStorage.removeItem("token");
    }

    public isLoggedIn() {
      if(localStorage.getItem('token')){
          let token = localStorage.getItem('token');

          let jwtData = token!.split('.')[1]

          let decodedJwtJsonData = window.atob(jwtData)

          let decodedJwtData = JSON.parse(decodedJwtJsonData)

          let expirationDateInMills = decodedJwtData.exp * 1000;

          let todayDateInMills = new Date().getTime();

          if (expirationDateInMills >= todayDateInMills)
              return true;
          
      }
      return false;
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }
}


