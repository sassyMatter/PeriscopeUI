import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project-page/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseURL ="http://localhost:8080/user-space/get-all-projects";
  baseURL1="http://localhost:8080/user-space/create-update-project";
  baseURL2="http://localhost:8080/user-space/create-new-project";
  constructor(private httpclient:HttpClient) { }
    /// get all projects request
    getAllProjects():Observable<Project[]>{
      return this.httpclient.get<Project[]>(`${this.baseURL}`);


    }
    //update project request
    updateprojects(project? : Project):Observable<Project>{
      return this.httpclient.post<Project>(`${this.baseURL1}`,project);

    }
    // save project request
    saveprojects(project ?: Project):Observable<Object>{
      return this.httpclient.post<Project>(`${this.baseURL2}`,project);
    }
  
}


