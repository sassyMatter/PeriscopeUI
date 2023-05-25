import { fabric } from 'fabric';
import { Component } from './component';

export class RestInterface extends Component {

    
  override createFabricObject(width?: number, height?: number, image?: string, position?: fabric.IPoint): fabric.Object {
    const fabricObject = super.createFabricObject(width, height, image, position);
    // Add additional customization specific to RestInterface class
    return fabricObject;
  }
}
