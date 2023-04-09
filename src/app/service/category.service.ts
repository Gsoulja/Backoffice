import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, share, tap, throwError } from 'rxjs';
import { CustomResponse } from '../interface/custom.response';
import { Category } from '../interface/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl='http://localhost:8080'

  constructor(private http:HttpClient) { }

  category$=<Observable<CustomResponse>>
this.http.get<CustomResponse>(`${this.apiUrl}/category/getAll`)
.pipe(
  tap(console.log),
  catchError(this.handleError)
);

addcategory$=(category:Category)=><Observable<CustomResponse>>
this.http.post<CustomResponse>(`${this.apiUrl}/category/add`,category)
.pipe(
  share(),
  tap(console.log),
  catchError(this.handleError)
);

handleError(error : HttpErrorResponse):Observable<never>
{
  console.log(error);
  return throwError(`erro  code :${error.status}`);
}
}
