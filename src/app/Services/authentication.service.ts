import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import {  IuserRegister } from '../Models/IuserRegister';
import { IuserLogin } from '../Models/IuserLogin';
import { ProducVM } from '../Models/produc-vm';
import { User } from '../Models/user';

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
     userList:User[]
     currentUser:User
     public logout = () => {
    this.saveUserCartFirst()
        localStorage.removeItem("token");
        localStorage.removeItem('current_user');
    }
saveUserCartFirst()
{
  this.userList=JSON.parse(localStorage.getItem('users')||'');
      console.log('the user are '+this.userList)
     // console.log(login.email)
     alert(this.userList.length)
     this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}')
      for(var i=0;i<this.userList.length;i++)
      {
        if(this.userList[i].email==this.currentUser.email)
        {
          alert('founded');
            this.userList[i].products=this.currentUser.products
          console.log(this.userList[i])
    localStorage.setItem('users',JSON.stringify(this.userList))
          break;
        }
      }
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


