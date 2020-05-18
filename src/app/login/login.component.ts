import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mark1 : boolean = false;
  mark2 : boolean = false;

  toggleEditable(event) {
    if ( event.target.checked ) {
        this.mark1 = false;
        this.mark2 = true;
   }
   else{ 
     this.mark1 = true;
     this.mark2 = true;
   }
}
  toggleEditable2(event) {
    if ( event.target.checked ) {
        this.mark2 = false;
        this.mark1 = true;
   }
   else {this.mark2 = true;
    this.mark1 = false;
  }
}


function1(){
  if (this.mark1) 
   this.router.navigate(['/mechanic']);
  else this.router.navigate(['/manager']);
}
  loginData = { user_name:'' , password:''};
  post(){
    this.apiService.login(this.loginData);
  }

  constructor(private apiService : ApiService,private router: Router ) { }

  ngOnInit(): void {
  }

}