import { RunningConfigurations } from "./RunningConfigurations";
import { Configurations } from "./configurations";

export class Project{
    
    projectName ?: string;
    imageURL ?: string; 
    configurations ?:Configurations;
    running ?:boolean;
    sourceDir ?: string;
    sourceDirName ?:string;
    canvasData ?: any;
    runningconfigurations?:RunningConfigurations;
    url?:string;
    
    constructor(configurations:Configurations,runningconfigurations:RunningConfigurations){
        this.configurations=configurations;
        this.runningconfigurations=runningconfigurations;
    }
    
    // constructor(runningconfiguratiosn:RunningConfigurations){
    //     this.runningconfigurations=runningconfiguratiosn;
    // }

}
