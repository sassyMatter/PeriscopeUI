import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project-page/project';
import { environment } from 'src/environments/environment';
import { Configurations } from './project-page/configurations';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  configurations : Configurations =new Configurations;
  // public currentproject :Project;
  currentproject: Project =new Project(this.configurations);
  currentprojecstate?:Project;
  public projects: Project[] =[] ;
  baseURL =`${environment.baseURL}/user-space/get-all-projects`;
  baseURL1=`${environment.baseURL}/user-space/create-update-project`;
  baseURL2=`${environment.baseURL}/user-space/delete-project`;


  constructor(private httpclient:HttpClient) { }
    /// get all projects request
    getAllProjects(){

      return this.httpclient.get<string>(`${this.baseURL}`);


    }
    //save or update project request
    saveupdateprojects(project? : Project):Observable<Project>{
      return this.httpclient.post<Project>(`${this.baseURL1}`,project);

    }
    deleteprojects(project?:Project):Observable<Project>{
      console.log(project);
      return this.httpclient.post<Project>(`${this.baseURL2}`,project);
    }
    setcurrentproject(project :Project){
      this.currentproject =project;
      this.currentprojecstate=project;
      this.currentproject.configurations=project.configurations;
      console.log("setting projectvalueprinting:", this.currentproject);
    }
    getcurrentproject(){
      console.log(this.currentprojecstate as Project);
      console.log(this.currentproject as Project);
      return this.currentproject as Project;  
    }
  
}


