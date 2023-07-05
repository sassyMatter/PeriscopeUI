
import { fabric } from 'fabric';
import { Item } from './component';
import { Field } from '../formField';
import { formFieldType } from '../enums/formFieldType';

export class Input extends Item {
  override connections: any[];
  imgUrl!: string;
  imageOptions!: fabric.IImageOptions;
  objects?: fabric.Object[];

  override formFields: Field[] = [
    {
      "name" : "inputSource",
      "type" : formFieldType.SHORT_STRING,
    },    
  ];
  
  override references: string[] = ["apiReference1"];

  constructor(event: DragEvent, width: number, height: number) {
    super();
   
    this.connections = [];
    this.imgUrl = "assets/big-data.png";
    this.type = "input";
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


//   static createWithImageAndConnections(
//     imgUrl: string,
//     imageOptions: fabric.IImageOptions,
//     connections: any[]
//   ): CustomGroup {
//     console.log("setting image ")
//     const customGroup = new CustomGroup();

//     fabric.Image.fromURL(imgUrl, (img) => {
//       img.set(imageOptions);

//       console.log("image is : " , img);
//       // Add the image to the custom group
//       customGroup.addWithUpdate(img);

//       // Set the connections property
//       customGroup.connections = connections;

//       // Render the custom group
//       customGroup.canvas?.renderAll();
//     });

//     return customGroup;
//   }
}
