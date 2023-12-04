import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from './project';
import { ProjectService } from '../project.service';
import { Configurations } from './configurations';
@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  configurations : Configurations =new Configurations;
  project: Project= new Project(this.configurations);
  
  private roles: string[] = [];
  isDropDownOpened: boolean = false;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  showNav: boolean = true;
  projects?: Project[]  ;
  
  constructor(private tokenStorageService: TokenStorageService, private authService : AuthService,private builder:FormBuilder,private router:Router,private projectservice:ProjectService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    console.log("logged In :: " , this.isLoggedIn);

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
    }
    
   
    this.getAllProject();
   
    
    
  }
  ngOnChanges(){
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  
  projectform=this.builder.group({
    
  })
  
  closeform(){
    this.router.navigate(['/projects']).then(() => {
      window.location.reload();
      });
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
  // 
  
  getAllProject(){
    this.projectservice.getAllProjects().subscribe(data=>{
      this.projects=data;
    })
  }
  
  updateproject(){
    console.log(this.project);
    // this.router.navigate(['/projects']).then(() => {
    //   window.location.reload();
    //   });
    this.projectservice.updateprojects(this.project).subscribe();
    // this.projectservice.saveprojects(this.project).subscribe();
  }
  

  
  
}
