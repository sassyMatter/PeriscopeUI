import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project-page/project';

@Component({
  selector: 'app-runningpage',
  templateUrl: './runningpage.component.html',
  styleUrls: ['./runningpage.component.css']
})
export class RunningpageComponent {
  public runningprojects:Project[]=[];
  constructor(private projectservice:ProjectService){}
  selectedProject:any=null;
  ngOnInit(): void{
    console.log("called");
      this.projectservice.runningprojects().toPromise().then(()=>{
          this.runningprojects=this.projectservice.runningproject;
          console.log(this.runningprojects)
      });
  }
  // selectproject(project:Project){
  //   this.selectedproject=project;
  // }
  toggleProjectDetails(project: Project): void {
    this.selectedProject = this.selectedProject === project ? null : project;
   }

}
