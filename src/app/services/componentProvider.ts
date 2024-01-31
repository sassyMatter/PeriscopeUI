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

    createComponent(type: string, width: number, height : number, left?: number, top?: number, event?: DragEvent): Item {
      switch (type) {
        case 'database':
          if(!event){
            return new Database(width, height, left, top);                              //creating component from backend
          }
          return new Database(width, height, undefined, undefined, event);    //creating component on frontend
        case 'function':
          if(!event){
            return new Func(width, height, left, top);
          }
          return new Func(width, height, undefined, undefined, event);
        case 'restInterface':
          if(!event){
            return new RestInterface(width, height, left, top);
          }
          return new RestInterface(width, height, undefined, undefined, event);
        case 'queue':
          if(!event){
            return new Topic(width, height, left, top);
          }
          return new Topic(width, height, undefined, undefined, event);
        case 'customGroup':
          if(!event){
            return new CustomGroup(width, height, left, top);
          }
          return new CustomGroup(width, height, undefined, undefined, event);
        case 'input':
          if(!event){
            return new Input(width, height, left, top);
          }
          return new Input(width, height, undefined, undefined, event);
        default:
          throw new Error('Invalid component type.');
      }
    }
}
