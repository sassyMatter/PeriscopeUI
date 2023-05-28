import { Injectable } from "@angular/core";
import { Component } from "../models/components/component";
import { Database } from "../models/components/database";
import { Func } from "../models/components/func";
import { RestInterface } from "../models/components/restInterface";
import { Topic } from "../models/components/topic";
import { CustomGroup } from "../models/components/customGroup";


@Injectable({
  providedIn: 'root'
}
)
export class ComponentProvider {

    createComponent(type: string, event: DragEvent, width: number, height : number): Component {
      console.log("calling create component");
      switch (type) {
        case 'database':
          return new Database(event, width, height);
        case 'function':
          return new Func(event, width, height);
        case 'restInterface':
          return new RestInterface(event, width, height);
        case 'topic':
          return new Topic(event, width, height);
        case 'customGroup':
          return new CustomGroup(event, width, height);
        default:
          throw new Error('Invalid component type.');
      }
    }
}