import { Component,OnInit } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthService } from '../services/auth/auth.service';

import { FormBuilder } from '@angular/forms';
import { Configurations } from '../project-page/configurations';
import { Project } from '../project-page/project';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { RunningConfigurations } from '../project-page/RunningConfigurations';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  configurations : Configurations=new Configurations;
  url:string="";
  isrunning:boolean=true;
  runningconfigurations:RunningConfigurations=new RunningConfigurations(this.url,this.isrunning);
  runconfigurations:RunningConfigurations={
    url:"linkk will be here",
    isrunning:true
  };
  project: Project =new Project(this.configurations,this.runningconfigurations);

  private roles: string[] = [];
  isDropDownOpened: boolean = false;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  showNav: boolean = true;
  projects?: Project[]  ;
  
  issaving:boolean=false;
  
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
    
   
   
   
    
    
  }
  ngOnChanges(){
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  
  projectform=this.builder.group({
    
  })
  
  closeform(){
    this.router.navigate(['/projects']);
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
  isValidInput(projectName :string) {
    const regex = /^[a-zA-Z0-9]+$/; // Matches only alphanumeric characters
    return regex.test(projectName);
  }
  
  
 
 
  saveproject(){
    
    
    if(this.project.projectName!=null && this.configurations.cpus!=null && this.configurations.memory!=null && this.configurations.storage!=null)
    {
      // this.runningconfigurations.isrunning=false;
      // this.runningconfigurations.url="https://www.google.co.in/";
      this.project.runningconfigurations=this.runconfigurations;
      console.log(this.project);
      console.log(this.runconfigurations);
      this.issaving=true;
        this.projectservice.saveprojects(this.project).subscribe(
          {
            
            next:data=>{
              console.log(this.project);
              console.log(data);
              this.issaving=false;    
              this.router.navigate(['/projects']).then(() => {
                window.location.reload();
              });
            },
            error:err=>{
              console.log(err);
            }
          }
        );
    }
    
    
    
    
     
  }
  
}
