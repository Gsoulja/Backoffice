import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, BehaviorSubject, map, startWith, catchError, of } from 'rxjs';
import { DataState } from '../enum/data.state.enum';
import { AppState } from '../interface/app-state';
import { CustomResponse } from '../interface/custom.response';
import { Queue } from '../interface/queue';
import { QueueService } from '../service/queue.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  appState$!: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  private filterSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null!);
  private isLoading = new BehaviorSubject<boolean>(false);
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
  addUser(queueForm: NgForm):void{
    console.log("Vou add ");
    this.isLoading.next(true);
   
    this.appState$ = this.queueService.addperson$(queueForm.value as Queue)
    .pipe(
      map(response =>{
        this.isLoading.next(true);
        this.updateQueue()
       console.log("Resultado " +this.dataSubject.value);
      this.isLoading.next(false);
      this.category=""
      
        return{ dataState:DataState.LOADED,appData:response}
      }),
      startWith({ dataState:DataState.LOADED,appData:this.dataSubject.value}),
      catchError((erro: string)=>
      {   this.isLoading.next(false);
          return of({ dataState:DataState.ERROR,erro})
      })
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
  ngOnInit():void{
    this.updateQueue();

  }
}
