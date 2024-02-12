import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder} from '@angular/forms';
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
  check :boolean=false;
  projectName?:string;
  memory?: string;
  storage?: string;
  cpus?: string;
  configurationsdata?:Configurations;

  @Input() projectdata?:Project[];
  
  @Input () configurationdata= new Configurations;
  


  showNav: boolean = true;
  projects?: Project ;
  
  constructor(private tokenStorageService: TokenStorageService, private authService : AuthService,private builder:FormBuilder,private router:Router,private projectservice:ProjectService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    console.log("logged In :: " , this.isLoggedIn);
   
    //  this.project.projectName=this.projectdata[0].projectName;
    for(let item of this.projectdata as Project[]){
        this.projects=item;
    }
    console.log(this.projects);
   console.log(this.projects?.configurations);
   this.configurationsdata=new Configurations;
   this.configurationsdata=this.projects?.configurations;

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
    }
    // this.project.projectName=this.projectdata.projectName;
    // this.project.configurations=this.projectdata.configurations;
   
    // this.getAllProject();
   
    
    
  }
  ngOnChanges(){
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  ngModel(){

  }

  
  projectform=this.builder.group({
   
  })
  
  closeform(){
    console.log(this.projectdata);
    // this.router.navigate(['/projects']).then(() => {
    //   window.location.reload();
    //   });
      
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
  
 
  
  updateproject(){
  console.log( this.projectservice.getcurrentproject());
    // console.log(this.projectdata);
    if(this.check==false){
  
    this.configurations=this.configurationdata;

    this.project.configurations=this.configurationsdata;
    for(let item of this.projectdata as Project[]){
      this.project=item as Project;
    }
   
    if(this.project.projectName!=null && this.configurations.cpus!=null&&this.configurations.memory!=null&&this.configurations.storage!=null)
    {
      this.projectservice.saveupdateprojects(this.project).subscribe();
    }}
    this.check=false;

    
   
  }
  opencanvas(){
    this.router.navigate(['/home']);
  }
   deleteproject(){

        this.check=true;
        this.projectservice.deleteprojects(this.projects).subscribe();
      // this.router.navigate(['/projects']).then(() => {
      //   window.location.reload();
      //   });
      
  }
 
  
  
  
  
}
