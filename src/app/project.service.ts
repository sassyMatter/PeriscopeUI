import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Project } from './project-page/project';
import { environment } from 'src/environments/environment';
import { Configurations } from './project-page/configurations';
import { Observable, catchError, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  configurations : Configurations =new Configurations;
 
  currentproject: Project =new Project(this.configurations);
  ishome:boolean=false;
  projectstate:Project=new Project(this.configurations);
  public userprojects: Project[] =[] ;
  baseURLgetProjects =`${environment.baseURL}/user-space/get-all-projects`;
  baseURLcreateProject=`${environment.baseURL}/user-space/create-project`;
  baseURLdeleteProject=`${environment.baseURL}/user-space/delete-project`;
  baseURLupdateProject=`${environment.baseURL}/user-space/update-project`;

  constructor(private httpclient:HttpClient) { 
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      this.currentproject = JSON.parse(savedState);
    } else {
      this.currentproject = this.getInitialState();
    }
  }
  getInitialState(){
    this.currentproject=this.projectstate;
    return this.currentproject;
  }
    /// get all projects request
    getAllProjects(){
      
      this.userprojects=[];
      // return this.httpclient.get<string>(`${this.baseURLgetProjects}`);
      return this.httpclient.get<string>(`${this.baseURLgetProjects}`).pipe (
        tap((response: any) => {
         for(let i of response.data){
          this.userprojects.push(i as Project);
         }
         console.log(this.userprojects);
    
        }),
        catchError((error) => {
          // Handle any errors that occur during the request
          console.error('Error occurred during get request', error);
          return of(null); // Returning a non-error observable to prevent unhandled error
        })
      );
      
        
    }
    
    //save project request
    saveprojects(project? : Project):Observable<Project>{
      this.setcurrentproject (project as Project ) ;
      this.ishome=true;
      return this.httpclient.post<Project>(`${this.baseURLcreateProject}`,project);

    }
    // delete project 
    deleteprojects(project?:Project):Observable<Project>{
      this.ishome=false;
      this.setcurrentproject(this.projectstate as Project);
      return this.httpclient.post<Project>(`${this.baseURLdeleteProject}`,project);
    }
    // update project
    updateproject(project?:Project):Observable<Project>{
      this.setcurrentproject (project as Project ) ;

      return this.httpclient.post<Project>(`${this.baseURLupdateProject}`,project);
    }

    //setting value of project which is being opened
    setcurrentproject(project :Project){
      this.ishome=true;
      this.currentproject =project;
      localStorage.setItem('appState', JSON.stringify(this.currentproject));
    }

    //getting value of currentproject
    getcurrentproject(){
      this.ishome=true;
      return this.currentproject as Project;  
    }
    logout(){
      localStorage.clear();
    }
   

    
    
   

}


