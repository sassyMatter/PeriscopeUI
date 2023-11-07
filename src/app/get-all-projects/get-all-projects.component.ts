import { Component } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-get-all-projects',
  templateUrl: './get-all-projects.component.html',
  styleUrls: ['./get-all-projects.component.css']
})
export class GetAllProjectsComponent {

  


  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private authService : AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    console.log("logged In :: " , this.isLoggedIn);

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
    }
  }

  ngOnChanges(){
    this.isLoggedIn = this.authService.isLoggedIn();
  }




  logout(): void {
    this.authService.logout();
  }
}
