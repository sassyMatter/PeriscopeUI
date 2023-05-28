import { fabric } from 'fabric';
import { Connector } from './connector';
import { v4 as uuid } from 'uuid';

export class Component extends fabric.Group  {
  connections: Connector[] = [];
  id:string |undefined;

  constructor() {
    super();
    this.id = uuid();
    // Set any default fabric.js object properties here
  }

  // createFabricObject(width?: number, height?: number, image?: string, position?: fabric.IPoint): fabric.Object {
  //   const fabricObject = new fabric.Object();

  //   return fabricObject;
  // }

  // createObject(componentType: string, event: DragEvent){
    
  // }
}
