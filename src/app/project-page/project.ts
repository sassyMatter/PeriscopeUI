import { Configurations } from "./configurations";

export class Project{
    
    projectName ?: string;
    imageURL ?: string; 
    configurations ?:Configurations;
    running ?:boolean;
    sourceDir ?: string;
    sourceDirName ?:string;
    canvasData ?: string;
    
    
    constructor(configurations:Configurations){
        this.configurations=configurations;
    }

}
