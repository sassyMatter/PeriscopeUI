import { fabric } from 'fabric';
import { Connector } from './connector';



export class Component extends fabric.Group  {
  connections: Connector[] = [];

  constructor() {
    super();
    // Set any default fabric.js object properties here
  }

  // createFabricObject(width?: number, height?: number, image?: string, position?: fabric.IPoint): fabric.Object {
  //   const fabricObject = new fabric.Object();

  //   return fabricObject;
  // }

  // createObject(componentType: string, event: DragEvent){
    
  // }
}
