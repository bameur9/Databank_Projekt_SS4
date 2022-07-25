import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin!:boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loadUserAuthentictatedUserFromLocalStorage();
    this.authService.isAdmin.subscribe(
      data => this.isAdmin = data
    )
  }

}
