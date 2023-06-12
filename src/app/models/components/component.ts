import { fabric } from 'fabric';
import { Connector } from './connector';
import { v4 as uuid } from 'uuid';

export class Item extends fabric.Group  {
  connections: Connector[] = [];
  id:string;
  

  constructor() {
    super();
    this.id = uuid();
    // Set any default fabric.js object properties here
  }


  override toObject(propertiesToInclude?: string[]): any {
    return fabric.util.object.extend(super.toObject(propertiesToInclude), {
      connections: this.connections,
      id: this.id,

    });
  }
}
