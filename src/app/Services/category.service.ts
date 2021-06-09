import {catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError } from 'rxjs';
import { Category } from '../Shared_Interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  url='http://http://localhost:56568/api/Category';
  addCategory(category:Category): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(category);

    return this.http.post<Category>(this.url, body,{headers:headers})
}

    returnAllCategory():Observable<Category[]>
    {
       return this.http.get<Category[]>(this.url).pipe(catchError((err)=>
        {

          return throwError(err.message ||"Internal Server error contact site adminstarator");
        }));
    }
    updateCategory(id:any,category:Category): Observable<Category> {
      return this.http.put<Category>(this.url+'/'+id,category).pipe(
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
getCategoryById(id:any):Observable<Category>
{
  return this.http.get<Category>(this.url+'/'+id).pipe(catchError((err)=>
  {

    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}
}

