import { fabric } from 'fabric';
import { Item } from './component';

export class Database extends Item {

    
  // override createFabricObject(width?: number, height?: number, image?: string, position?: fabric.IPoint): fabric.Object {
  //   const fabricObject = super.createFabricObject(width, height, image, position);
  //   // Add additional customization specific to Database class
   
  //   // Add additional customization specific to Database class
  //   fabricObject.set({
  //     fill: 'blue',
  //     // Add any other properties or customization specific to Database objects
  //   });

  //   // Add image to fabric object
  //   if (image) {
  //     // fabric.Image.fromURL(image.g, (img) => {
  //       // img.scaleToWidth(image); // Scale image to desired width
  //       // img.scaleToHeight(height); // Scale image to desired height

  //       // fabricObject.addWithUpdate(img);
  //       fabricObject.setCoords();
  //     // });
  //   }

  //   return fabricObject;

  //   return fabricObject;
  // }

  
  override connections: any[];
  imgUrl!: string;
  imageOptions!: fabric.IImageOptions;
  objects?: fabric.Object[];

  constructor(event: DragEvent, width: number, height: number) {
    super();
    this.connections = [];
    this.imgUrl = "assets/databaseResized.png";
    this.type = "database";
    this.imageOptions = { 
        width: width + 14,
        height: height + 14,
        left: event.offsetX-25,
        top: event.offsetY-25,
        centeredScaling: true,
        originX: 'center', 
        originY: 'center',
      }
    
   
    fabric.Image.fromURL(this.imgUrl, (img) => {

      // setting image options
        img.set(this.imageOptions);
  
        console.log("image is : " , img);
        // Add the image to the custom group
        this.addWithUpdate(img);
  
        // // Set the connections property
        // this.connections = connections;
  
        // Render the custom group
        // this.canvas?.renderAll();
      });


    
  }


  // override createObject(componentType: string, event: DragEvent){
    
  // }
}
