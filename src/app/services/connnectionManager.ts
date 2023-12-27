import { Injectable } from "@angular/core";
import { Item } from "../models/components/component";
import { Connector } from "../models/components/connector";



@Injectable({
    providedIn: 'root'
  })
export class ConnectionManager {


    establishBiDirectionalConnection(component1: Item, component2: Item) {
      const connector1 = new Connector(component1.id);
      const connector2 = new Connector(component2.id);
      component1.connections.push(connector2);
      // component1.references.push(...component2.references);
      component2.references.forEach((value) => component1.references.add(value));
      console.log("added references from " + component2 + " to " + component1 + " ::" + component1.references);
      component2.connections.push(connector1);
      // component2.references.push(...component1.references);
      component1.references.forEach((value) => component2.references.add(value));
      
    }
  
    // Add other methods for managing connetions
    // true : from comp1 to comp2
    // false : from comp2 to comp1
    establishDirectionalConnection(component1: Item, component2: Item, direction: boolean){
        
        console.log("directional :: " + direction);
        if(direction){
            const connector = new Connector(component2.id);
            component1.connections.push(connector);
            // component1.references.push(...component2.references);
            component2.references.forEach((value) => component1.references.add(value));
        }else{
           this.establishBiDirectionalConnection(component1, component2);
        }
    }
    deleteObject(component1: Item){
      console.log("deleteobject");
      if(component1.connections.length==0){
        //delete this object
      }
      
    }
  }