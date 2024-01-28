import { Component } from '@angular/core';
//import { AuthorsService } from '../../../homepage/Admin-home/authors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent 
{
  title = "3 Authors";
  //authors;

 /* constructor(authors: AuthorsService, private router: Router){
    this.authors = authors.getAuthors();
  }
   navigateToAuthorsComponent(){
    this.router.navigate(['/authors']);
   } */
  
}
