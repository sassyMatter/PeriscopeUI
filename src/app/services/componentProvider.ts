import { Injectable } from "@angular/core";
import { Item } from "../models/components/component";
import { Database } from "../models/components/database";
import { Func } from "../models/components/func";
import { RestInterface } from "../models/components/restInterface";
import { Topic } from "../models/components/topic";
import { CustomGroup } from "../models/components/customGroup";
import { Input } from "../models/components/input";
 
@Injectable({
  providedIn: 'root'
}
)
export class ComponentProvider {
 
  public canvasData: any;
 
  getmap(obj:any){
    const mymap=new Map<string, string>();
    for (const [key, value] of Object.entries(obj)) {
      // console.log(`Key: ${key}, Value: ${value}`);
      let dataType=key;
      if(dataType=="dataType"){
          continue;
      }
      if(`Value: ${value}` .includes(':'))
      {
        let values=(`Value: ${value}`);
        let keyvalues=(values.substring(7));
        let parts = keyvalues.split(",");
        for (let i = 0; i < parts.length; i += 2) {
          mymap.set(parts[i], parts[i + 1]);
        }
      }
       
     
    }
    return mymap;
  }
  //to parse json types of custom components
  convertcustomtypes(obj:any){
    
    const mymap=new Map<string, string>();
    
 
    for (const [key, value] of Object.entries(obj)) {
      // console.log(`Key: ${key}, Value: ${value}`);
      let dataType=key;
      if(dataType=="dataType"){
          continue;
      }
 
      if(`Value: ${value}` .includes(','))
      {
       const input=(`Value: ${value}`);
       const parts = input.substring(7);
     
       let key = '',values = '',bool = 0;
 
 
        for (let i = 0; i < parts.length; i++) {
            
            if(parts[i]==' '&&i>0&&parts[i-1]==',')
              continue;
            if(parts[i]==','&&i>0&&parts[i-1]=='}')
            {
                console.log("yes");
                continue;
            }
            if (parts[i] === '}') {
              values += parts[i];
              mymap.set(key, values);
              key = '';
              values = '';
              bool = 0;
              while(i+1<parts.length&&parts[i+1]!=',')
                i++;
              i++;
 
            }
            else if(parts[i]==','&&parts[i+1]=='{'){
              bool=1;
            }
            else if (bool) {
              values += parts[i];
            }
            else {
              key += parts[i];
            }
          }
        }
    }
    return mymap;
  }
 
    createComponent(type: string, width: number, height : number, left?: number, top?: number, event?: DragEvent): Item {
      switch (type) {
        case 'database':
          if(!event){
            const database = new Database(width, height, left,top);
            
              // provide null check for canvas data, component provider ideally should be injected instead of being created everywhere
            if(this.canvasData!=null){
              database.tableDefinitions = this.canvasData['tableDefinitions'];
              database.tableNames = this.canvasData['tableNames']
              database.loadDataToFormFields();
            }
              
            return database;  
             
          }
          const database = new Database(width, height, undefined, undefined, event);
        
        
          
          return database  //creating component on frontend
        case 'function':
          if(!event){
            const func= new Func(width, height, left, top);
            
            if(this.canvasData!=null){
              func.parameters=this.getmap(this.canvasData['parameters']);
              func.returnType=this.canvasData['returnType'];
              func.functionBody=this.canvasData['functionBody'];
              func.functionName=this.canvasData['functionName'];
              func.topic=this.canvasData['topic'];
              func.deserializationClass=this.canvasData['deserializationClass'];
              func.functionType=this.canvasData['functionType'];
              
              func.loadDataToFormFields();
            }
            return func;
             //creating component from projectservice currentstateproject se
          }
          return new Func(width, height, undefined, undefined, event);
        case 'restInterface':
          if(!event){
            const restinterface= new RestInterface(width, height, left, top);
            
            if(this.canvasData!=null){
              restinterface.url=this.canvasData['url'];
              restinterface.headers=this.getmap(this.canvasData['headers']);
              console.log(restinterface.headers);
              restinterface.requestBody=this.getmap(this.canvasData['requestBody']);
              restinterface.requestUrl=this.canvasData['requestUrl'];
              restinterface.apiType=this.canvasData['apiType'];
              restinterface.httpMethod=this.canvasData['httpMethod'];
              restinterface.methodName=this.canvasData['methodName'];
              restinterface.loadDataToFormFields();
            }
            return restinterface;
            
          }
          return new RestInterface(width, height, undefined, undefined, event);
        case 'queue':
          if(!event){
            const queue= new Topic(width, height, left, top);
         
            if(this.canvasData!=null){
              
              queue.topic=this.canvasData['topic'];
              queue.loadDataToFormFields();
            }
            return queue;
          }
          return new Topic(width, height, undefined, undefined, event);
        case 'customGroup':
          if(!event){
            const customgroup= new CustomGroup(width, height, left, top);
            
            if(this.canvasData!=null){
              customgroup.loadDataToFormFields();
            }
            return customgroup;
          }
          return new CustomGroup(width, height, undefined, undefined, event);
        case 'input':
          if(!event){
            const input= new Input(width, height, left, top);
            if(this.canvasData!=null){
              // input['customTypes']=this.canvasData['customTypes'];
              //input meh krna hai
              // console.log(this.canvasData['customTypes']);
              input.customTypes=this.convertcustomtypes(this.canvasData['customTypes']);
              // console.log("input function printing ",input['customTypes']);
              input.loadDataToFormFields();
            }
            return input;
          }
          return new Input(width, height, undefined, undefined, event);
        default:
          throw new Error('Invalid component type.');
      }
    }
}