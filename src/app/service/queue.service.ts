import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, share, tap, throwError } from 'rxjs';
import { CustomResponse } from '../interface/custom.response';
import { Queue } from '../interface/queue';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private readonly apiUrl='http://localhost:8080'

  constructor(private http:HttpClient) { }

queue$=<Observable<CustomResponse>>
this.http.get<CustomResponse>(`${this.apiUrl}/queue/getAll`)
.pipe(
  tap(console.log),
  catchError(this.handleError)
);

addperson$=(queue:Queue)=><Observable<CustomResponse>>
this.http.post<CustomResponse>(`${this.apiUrl}/queue/add`,queue)
.pipe(
  share(),
  tap(console.log),
  catchError(this.handleError)
);

notify$=(queue:Queue)=><Observable<CustomResponse>>
this.http.post<CustomResponse>(`${this.apiUrl}/queue/notify`,queue)
.pipe(
  tap(console.log),
  catchError(this.handleError)
);
closeAtendace$=(queue:Queue,user:User)=><Observable<CustomResponse>>
this.http.post<CustomResponse>(`${this.apiUrl}/queue/delete`,queue.user)
.pipe(
  tap(console.log),
  catchError(this.handleError)
);

getUser$=(token:string)=><Observable<CustomResponse>>
this.http.post<CustomResponse>(`${this.apiUrl}/queue/getUser`,token)
.pipe(
  tap(console.log),
  catchError(this.handleError)
);

handleError(error : HttpErrorResponse):Observable<never>
{
  console.log(error);
  return throwError(`erro  code :${error.status}`);
}
}
