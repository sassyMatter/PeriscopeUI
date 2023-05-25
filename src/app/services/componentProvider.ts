import { Injectable } from "@angular/core";
import { Components } from "../models/components/component";
import { Database } from "../models/components/database";
import { Func } from "../models/components/func";
import { RestInterface } from "../models/components/restInterface";
import { Topic } from "../models/components/topic";


@Injectable(
{providedIn : 'root'}
)
export class ComponentProvider {
    createComponent(type: string): Components {
      switch (type) {
        case 'database':
          return new Database();
        case 'function':
          return new Func();
        case 'restInterface':
          return new RestInterface();
        case 'topic':
          return new Topic();
        default:
          throw new Error('Invalid component type.');
      }
    }
}