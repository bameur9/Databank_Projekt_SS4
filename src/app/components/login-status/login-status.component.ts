import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated!:boolean;

  constructor(private authService: AuthService,
            private route: Router) { }


  ngOnInit(): void {
    this.authService.loadUserAuthentictatedUserFromLocalStorage();
    this.authService.isAuthenticated.subscribe(
      data => this.isAuthenticated = data
    )

  }

  logout():void {
    this.route.navigate(['/login']);
    this.authService.removeTockenFromLocalStorage();
    localStorage.clear();
  }

}
