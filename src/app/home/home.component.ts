import { Component, Input } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthService } from '../services/auth/auth.service';
import { Project } from '../project-page/project';
import { ProjectService } from '../project.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isDropDownOpened: boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  project ?:Project;


  constructor(private tokenStorageService: TokenStorageService, private authService : AuthService,private projectservice:ProjectService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    console.log("logged In :: " , this.isLoggedIn);
    this.project=this.projectservice.currentproject as Project;
    console.log(this.projectservice.currentproject.projectName);
    console.log("dbd",JSON.stringify(this.project));

    console.log(this.project.sourceDir);
    console.log(this.projectservice.getcurrentproject());
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

  toggleDropDown(): void {
    this.isDropDownOpened = !this.isDropDownOpened;
  }

  clickedOutside(): void {
    this.isDropDownOpened = false;
  }
}