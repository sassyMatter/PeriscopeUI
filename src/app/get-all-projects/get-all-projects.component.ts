import { Component,Input } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Project } from '../project-page/project';
import { ProjectService } from '../project.service';
import { catchError, of, tap } from 'rxjs';
import { Configurations } from '../project-page/configurations';
import { CdkPortal } from '@angular/cdk/portal';
import { Router } from '@angular/router';
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
  side_Navbar=true;
  showNav: boolean = true;
  public projects: Project[] =[] ;
  project ?:Project;
  projectsend :Project[]=[];
  selectedProjectname:any;

  configurationsend: Configurations= new Configurations;
  constructor(private tokenStorageService: TokenStorageService, private authService : AuthService,private http:HttpClient,private projectservice:ProjectService,private router:Router) {
   
   }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    console.log("logged In :: " , this.isLoggedIn);
    this.projects=[];
    this.getAllProject();

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

  selectProject(projectname:any){
    for(let item of this.projects){
        if(item.projectName==projectname)
        {
          this.selectedProjectname =item.projectName;
        }
    }
  }
  logout(): void {
    this.authService.logout();
  }

  openproject(item:Project){
    
    this.should_open=true;
    this.selectProject(item.projectName);
    this.projectservice.setcurrentproject(item as Project);
    this.projectsend=[];
    this.projectsend.push(item);
    console.log(this.projectservice.getcurrentproject());
    for(let item of this.projectsend)
    {
      this.configurationsend=(item.configurations as Configurations);
    }
    console.log(this.selectedProjectname);
  }
  
  toggleDropDown(): void {
    this.isDropDownOpened = !this.isDropDownOpened;
  }

  clickedOutside(): void {
    this.isDropDownOpened = false;
  }

  opensideNavbar(){
    this.side_Navbar=!this.side_Navbar;
  }

  getAllProject(){
    this.projectservice.getAllProjects().toPromise().then(()=>{
      this.projects=this.projectservice.userprojects;
      console.log(this.projects.length);
      if(this.projects.length==0){
        console.log("going to project page");
          // this.gotocreateprojectpage();
      }
    });  
  }
  gotocreateprojectpage(){
    
    this.router.navigate(['/newproject']);
  }
  
}