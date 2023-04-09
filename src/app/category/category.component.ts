import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, BehaviorSubject, map, startWith, catchError, of } from 'rxjs';
import { DataState } from '../enum/data.state.enum';
import { AppState } from '../interface/app-state';
import { Category } from '../interface/category';
import { CustomResponse } from '../interface/custom.response';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  appState$!: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  private filterSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null!);
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$= this.isLoading.asObservable();
 
 
  category = '';
  constructor(private categoryService : CategoryService) {}
  
 
  
  updateCategory():void{
    this.appState$ = this.categoryService.category$
    .pipe(
      map(response =>{
        this.dataSubject.next(response);
        return{ dataState:DataState.LOADED,appData:response}
      }),
      startWith({ dataState:DataState.LOADING}),
      catchError((erro: string)=>{ return of({ dataState:DataState.ERROR,erro})})
    )
  }
  addCategory(categoryForm: NgForm):void{
    console.log("Vou add ");
    this.isLoading.next(true);
   
    this.appState$ = this.categoryService.addcategory$(categoryForm.value as Category)
    .pipe(
      map(response =>{
        this.isLoading.next(true);
        this.updateCategory()
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
  
  displayStyle = "none";
  
  openPopup(cat :string) {
    this.category=cat
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  ngOnInit() {
    this.updateCategory();
  }
}
