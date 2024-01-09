import { Injectable } from "@angular/core";
import { Item } from "../models/components/component";
import { Database } from "../models/components/database";
import { Func } from "../models/components/func";
import { RestInterface } from "../models/components/restInterface";
import { Topic } from "../models/components/topic";
import { CustomGroup } from "../models/components/customGroup";
import { Input } from "../models/components/input";
import { DatabaseTemp } from "../models/components/databasetemp";
import { FuncTemp } from "../models/components/functemp";
import { RestInterfaceTemp } from "../models/components/restInterfacetemp";
import { TopicTemp} from "../models/components/topictemp";
import { CustomGroupTemp } from "../models/components/customGrouptemp";
import { InputTemp} from "../models/components/inputTemp";


@Injectable({
  providedIn: 'root'
}
)
export class ComponentProvider {

    createComponent(type: string, event: DragEvent, width: number, height : number): Item {
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
        case 'input':
          return new Input(event, width, height);
        default:
          throw new Error('Invalid component type.');
      }
    }
    recreateComponent(type: string, width: number, height : number, left : number, top : number): Item {

      switch (type) {
        case 'database':
          return new DatabaseTemp(width, height, left, top);
        case 'func':
          return new FuncTemp(width, height, left, top);
        case 'rest':
          return new RestInterfaceTemp(width, height, left, top);
        case 'queue':
          return new TopicTemp(width, height, left, top);
        case 'CustomGroup':
          return new CustomGroupTemp(width, height, left, top);
        case 'input':
          return new InputTemp(width, height, left, top);
        default:
          throw new Error('Invalid component type.');
      }
    }

}
