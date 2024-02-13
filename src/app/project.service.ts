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
  baseURLgetProjects =`${environment.baseURL}/user-space/get-all-projects`;
  baseURLcreateProject=`${environment.baseURL}/user-space/create-project`;
  baseURLdeleteProject=`${environment.baseURL}/user-space/delete-project`;
  baseURLupdateProject=`${environment.baseURL}/user-space/update-project`;

  constructor(private httpclient:HttpClient) { }
    /// get all projects request
    getAllProjects(){
      return this.httpclient.get<string>(`${this.baseURLgetProjects}`);
    }
    //save project request
    saveprojects(project? : Project):Observable<Project>{
      return this.httpclient.post<Project>(`${this.baseURLcreateProject}`,project);

    }
    // delete project 
    deleteprojects(project?:Project):Observable<Project>{
      return this.httpclient.post<Project>(`${this.baseURLdeleteProject}`,project);
    }
    // update project
    updateproject(project?:Project):Observable<Project>{
      console.log("going uopdate");
      
      console.log(project?.canvasData);
      return this.httpclient.post<Project>(`${this.baseURLupdateProject}`,project);
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


