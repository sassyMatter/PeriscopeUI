import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Project } from './project-page/project';
import { environment } from 'src/environments/environment';
import { Configurations } from './project-page/configurations';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  configurations : Configurations =new Configurations;
 
  currentproject: Project =new Project(this.configurations);
  
  
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
      return this.httpclient.post<Project>(`${this.baseURL2}`,project);
    }
    //setting value of project which is being opened
    setcurrentproject(project :Project){
      this.currentproject =project;
    }
    //getting value of currentproject
    getcurrentproject(){
      return this.currentproject as Project;  
    }
    
   

}


