import { Component } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthService } from '../services/auth/auth.service';



@Component({
  selector: 'app-get-all-projects',
  templateUrl: './get-all-projects.component.html',
  styleUrls: ['./get-all-projects.component.css']
})
export class GetAllProjectsComponent {
  toggle1 = true;toggle2 = true;toggle3 = true;toggle4 = true;
  public should_open=false;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  isDropDownOpened: boolean = false;

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

  openproject1(){
    this.should_open=true;
    this.toggle1=false;
    this.toggle2=true;this.toggle3=true;
    this.toggle3=true;
  }
  openproject2(){
    this.should_open=true;
    this.toggle2=false;
    this.toggle1=true;this.toggle4=true;
    this.toggle3=true;
  }
  openproject3(){
    this.should_open=true;
    this.toggle3=false;
    this.toggle2=true;this.toggle4=true;
    this.toggle1=true;
  }
  openproject4(){
    this.should_open=true;
    this.toggle4=false;
    this.toggle2=true;this.toggle1=true;
    this.toggle3=true;

  }
  toggleDropDown(): void {
    this.isDropDownOpened = !this.isDropDownOpened;
  }

  clickedOutside(): void {
    this.isDropDownOpened = false;
    
  }
}
