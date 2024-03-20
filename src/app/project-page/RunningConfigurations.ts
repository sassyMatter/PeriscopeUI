export class RunningConfigurations{
    url ?:string;
    isrunning?:boolean;
    constructor(url:string,isrunning:boolean){
        this.url=url;
        this.isrunning=isrunning;
    }
}