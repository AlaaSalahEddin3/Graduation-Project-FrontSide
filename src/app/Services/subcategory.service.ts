import {catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Isubcategory } from '../Shared_Interfaces/Isubcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http:HttpClient) { }
  //url='http://localhost:56568/api/controller';
  url='http://localhost:56568/api/Sub_Category';
  
  addCategory(subcategory:Isubcategory): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(subcategory);

    return this.http.post<Isubcategory>(this.url, body,{headers:headers})
}

    returnAllCategory():Observable<Isubcategory[]>
    {
       return this.http.get<Isubcategory[]>(this.url).pipe(catchError((err)=>
        {

          return throwError(err.message ||"Internal Server error contact site adminstarator");
        }));
    }
    updateCategory(id:any,subcategory:Isubcategory): Observable<Isubcategory> {
      return this.http.put<Isubcategory>(this.url+'/'+id,subcategory).pipe(
        catchError((err)=>{
          console.log("erro ocuured")
          return throwError(err.message ||"Internal Server error contact site adminstarator");


        })
      );
  }
  deleteCategory(id: number):Observable<number>{
    return this.http.delete<number>(this.url+'/'+id)
    .pipe(
      catchError( (err) => {
        return throwError(err.message ||"Error deleting travellers data.");
     }));
}
getCategoryById(id:any):Observable<Isubcategory>
{
  return this.http.get<Isubcategory>(this.url+'/'+id).pipe(catchError((err)=>
  {

    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}
 /*
  getProductsByPage(pageSize: number, pageNumber: number): Observable<Isubcategory[]> {
    //let url = `${environment.apiUrl}/api/Sub_Category/${pageSize}/${pageNumber}`;
   //let url='http://localhost:56568/api/Sub_Category/${pageSize}/${pageNumber}`;
    return this.http.get<Isubcategory[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }*/
  /*
  getProductsByCategoryPaging(categoryId:number, pageSize: number, pageNumber: number): Observable<Isubcategory[]> {
    //let url = `${environment.apiUrl}/api/Sub_Category/Category/${categoryId}/${pageSize}/${pageNumber}`;
    return this.http.get<Isubcategory[]>(url).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }*/

 
 
}
