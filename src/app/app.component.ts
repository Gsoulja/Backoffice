import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Backoffice';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
   
  }

   openNav() :void{
    const box = document.getElementById('mySidenav');
  
  if (box != null) {

    box.classList.add('sidenavfull');

    // ✅ Remove class
   box.style.setProperty
    console.log(box)
    box.style.setProperty('width','100');
    console.log(box.classList)
  }
}


 closeNav() :void{
  const box = document.getElementById('mySidenav');
console.log(box)
  if (box != null) {
    box.classList.remove('sidenavfull');
    
  }
}
logout() :void{
  this.authService.doLogout();
  

}
}
