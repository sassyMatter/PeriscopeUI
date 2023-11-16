import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  Name:String |undefined;
  constructor(private tokenStorageService: TokenStorageService, private authService : AuthService,private builder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    console.log("logged In :: " , this.isLoggedIn);

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
    }

   

   
    console.log("Name:Project");
    console.log(this.projectform.value);
    
  }

  ngOnChanges(){
    this.isLoggedIn = this.authService.isLoggedIn();
  }




  logout(): void {
    this.authService.logout();
  }
  
  projectform=this.builder.group({
    Name:this.builder.control('',Validators.required),
    Memory:this.builder.control('',Validators.required),
    Storage:this.builder.control('',Validators.required),
    CPU:this.builder.control('',Validators.required)
  })
  
  saveproject(){
    console.log(this.projectform.value);
    // this.router.navigate(['/projects']).then(() => {
    //   window.location.reload();
    //   });
  }
  
  closeform(){
    this.router.navigate(['/projects']).then(() => {
      window.location.reload();
      });
  }
}
