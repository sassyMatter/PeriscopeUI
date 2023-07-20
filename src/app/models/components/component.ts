import { fabric } from 'fabric';
import { Connector } from './connector';
import { v4 as uuid } from 'uuid';
import { Field } from '../formField';



export class Item extends fabric.Group  {
  connections: Connector[] = [];
  id:string;
  formFields: Field[] = [];
  // references: string[] = [];
  references1: Set<string> = new Set();
  
  

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

  unloadDataFromFormFields(){
     console.log("unloading data from form fields");
  }

  loadDataToFormFields(){
      console.log("loading data to form fields");
  }

  
}
