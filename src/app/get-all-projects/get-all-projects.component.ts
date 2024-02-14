import { Component,Input } from '@angular/core';
import { TokenStorageService } from '../services/auth/token-storage.service';
import { AuthService } from '../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Project } from '../project-page/project';
import { ProjectService } from '../project.service';
import { catchError, of, tap } from 'rxjs';
import { Configurations } from '../project-page/configurations';

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

  configurationsend: Configurations= new Configurations;
  constructor(private tokenStorageService: TokenStorageService, private authService : AuthService,private http:HttpClient,private projectservice:ProjectService) {
    this.getAllProject();
   }

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

  openproject(item:Project){
    
    this.should_open=true;
    
    this.projectservice.setcurrentproject(item as Project);
    console.log(this.projectservice.currentproject);
    this.project=item;
    this.projectsend=[];
    this.projectsend.push(item);
    console.log(this.projectservice.getcurrentproject())
  
    for(let item of this.projectsend)
    {
      this.configurationsend=(item.configurations as Configurations);
    }
 

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
  addition(ob:Project){  
    this.projects.push(ob); 
  }
  getAllProject(){
   
    this.projectservice.getAllProjects().pipe (
      tap((response: any) => {
       
        console.log(response.data);
      
       for(let i of response.data){
        
        this.addition(i);
        
       
       }
      }),
      catchError((error) => {
        // Handle any errors that occur during the request
        console.error('Error occurred during get request', error);
        return of(null); // Returning a non-error observable to prevent unhandled error
      })
    ).subscribe();

}
}