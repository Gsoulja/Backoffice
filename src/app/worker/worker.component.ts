import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  
  constructor() {}
  
  ngOnInit() {}
  
  displayStyle = "none";
  
  openPopup() {
    
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
