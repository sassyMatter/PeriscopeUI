import { fabric } from 'fabric';
import { Item } from './component';
import { formFieldType } from '../enums/formFieldType';
import { Field } from '../formField';

export class Func extends Item {

    
  // override createFabricObject(width?: number, height?: number, image?: string, position?: fabric.IPoint): fabric.Object {
  //   const fabricObject = super.createFabricObject(width, height, image, position);
  //   // Add additional customization specific to Function class
  //   return fabricObject;
  // }

  // override createObject(componentType: string, event: DragEvent){
    
  // }
  override connections: any[];
  imgUrl!: string;
  imageOptions!: fabric.IImageOptions;
  objects?: fabric.Object[];


  override formFields: Field[] = [
    {
      "name": "functionType",
      "type": formFieldType.SHORT_STRING
    },
    {
      "name" : "functionName",
      "type" : formFieldType.SHORT_STRING,
    },
    {
      "name" : "functionBody",
      "type" : formFieldType.CODE_EDITOR
    },
    {
      "name" : "parameters",
      "type" : formFieldType.EXTENDIBLE_MAP
    },
    {
      "name" : "returnType",
      "type" : formFieldType.SHORT_STRING
    },
    {
      "name" : "topic",
      "type" : formFieldType.SHORT_STRING
    }
  ];

  override references: string[] = ["jdbcTemplate", "kafkaProducer"];


  constructor(event: DragEvent, width: number, height: number) {
    super();
    this.connections = [];
    this.imgUrl = "assets/LamdaResize.png";
    this.type = "func";
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
}
