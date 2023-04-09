import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from '../enum/data.state.enum';
import { AppState } from '../interface/app-state';
import { CustomResponse } from '../interface/custom.response';
import { Queue } from '../interface/queue';
import { User } from '../interface/user';
import { QueueService } from '../service/queue.service';

@Component({
  selector: 'app-queue-management',
  templateUrl: './queue-management.component.html',
  styleUrls: ['./queue-management.component.css']
})
export class QueueManagementComponent  implements OnInit{
  appState$!: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  private filterSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null!);
  private isLoading = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<User>(null!);
  u=this.user.asObservable();
  isLoading$= this.isLoading.asObservable();
  category = '';
  constructor(private queueService: QueueService) {}

  notifyUser(queue : Queue):void{
    this.appState$ = this.queueService.notify$(queue)
    .pipe(
      map(response =>{
         // @ts-ignore: Object is possibly 'null'.
        this.dataSubject.value.data.queues[
           // @ts-ignore: Object is possibly 'null'.
          this.dataSubject.value.data.queues.findIndex(queue=> queue.id===response.data.queue.id)
        ] = response.data.queue?.id;
        return{ dataState:DataState.LOADED,appData:response}
      }),
      startWith({ dataState:DataState.LOADED,appData:this.dataSubject.value}),
      catchError((erro: string)=>{ return of({ dataState:DataState.ERROR,erro})})
    )

   
  }

  closeAtendace(queue : Queue):void{
   
    this.appState$ = this.queueService.closeAtendace$(queue,this.getUser() )
    .pipe(
      map(response =>{

        this.updateQueue();
        return{ dataState:DataState.LOADED,appData:response}
      }),
      startWith({ dataState:DataState.LOADED,appData:this.dataSubject.value}),
      catchError((erro: string)=>{ return of({ dataState:DataState.ERROR,erro})})
    )

   
  }

  getUser():any{
    let token = localStorage.getItem('access_token');
    if(token!=null)
    this.appState$ = this.queueService.getUser$(token)
    .pipe(
      map(response =>{

        this.updateQueue();
        return{ dataState:DataState.LOADED,appData:response}
      }),
      startWith({ dataState:DataState.LOADED,appData:this.dataSubject.value}),
      catchError((erro: string)=>{ return of({ dataState:DataState.ERROR,erro})})
    )

   
  }
  
  getCategory(category: string):void{
    console.log("Vou add cat ");
    this.category=category;
  }

  updateQueue():void{
    this.appState$ = this.queueService.queue$
    .pipe(
      map(response =>{
        this.dataSubject.next(response);
        return{ dataState:DataState.LOADED,appData:response}
      }),
      startWith({ dataState:DataState.LOADING}),
      catchError((erro: string)=>{ return of({ dataState:DataState.ERROR,erro})})
    )
  }
 
  ngOnInit(): void {
    this.updateQueue();
  }

}
