import { Configurations } from "./configurations";

export class Project{
    
    // id?:string;
    projectName ?: string;
    imageURL ?: string; 
    configurations ?:Configurations;
    running ?:boolean;
    sourceDir ?: string;
    sourceDirName ?:string;
    canvasData ?: any;
    
    
    constructor(configurations:Configurations){
        this.configurations=configurations;
    }

}
