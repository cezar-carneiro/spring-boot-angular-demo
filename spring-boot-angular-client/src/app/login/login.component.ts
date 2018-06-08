import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;

  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) { }

  login(){
    this.authService.login(this.username, this.password).subscribe(
      res => this.router.navigate(['home']), 
      err => this.errorMsg = err.error.message);
  }

}
