import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {



  constructor(private router: Router){}
  changeTheme(){
    
  
    var theme = localStorage.getItem('theme');

    if(!theme){
      localStorage.setItem('theme', 'dark');
    }else{
      localStorage.removeItem('theme')
    }
    
    this.router.navigate(['/alumni/home']);
  }
}
