import { fabric } from 'fabric';
import { Item } from './component';
import { formFieldType } from '../enums/formFieldType';
import { Field } from '../formField';

export class RestInterface extends Item {

    
//   override createFabricObject(width?: number, height?: number, image?: string, position?: fabric.IPoint): fabric.Object {
//     const fabricObject = super.createFabricObject(width, height, image, position);
//     // Add additional customization specific to RestInterface class
//     return fabricObject;
//   }
//  override createObject(componentType: string, event: DragEvent){
    
//   }
override connections: any[];
imgUrl!: string;
imageOptions!: fabric.IImageOptions;
objects?: fabric.Object[];

// custom Properties
url: string;
// type: string;
headers: Map<string, string>;
requestBody: Map<string, string>;
requestUrl: string;
apiType: string;
httpMethod: string;
methodName: string;


override formFields: Field[] = [
  {
    "name" : "url",
    "type" : formFieldType.SHORT_STRING,
  },
  {
    "name" : "type",
    "type" : formFieldType.DROP_DOWN,
  },
  {
    "name" : "headers",
    "type" : formFieldType.EXTENDIBLE_MAP,
    "value" : new Map<string, string>([
      ["key1", "value1"],
      ["key2", "value2"]
    ])
  },
  {
    "name" : "requestBody",
    "type" : formFieldType.EXTENDIBLE_MAP,
  }
  ,
  {
    "name" : "requestUrl",
    "type" : formFieldType.SHORT_STRING,
  }
  ,
  {
    "name" : "apiType",
    "type" : formFieldType.DROP_DOWN,
    "options": ["POST", "GET"]
  }
  ,
  {
    "name" : "httpMethod",
    "type" : formFieldType.DROP_DOWN,
  }
  ,
  {
    "name" : "methodName",
    "type" : formFieldType.SHORT_STRING,
  }
  
];

override references: string[] = ["methodReference1", "methodRefence2"];

constructor(event: DragEvent, width: number, height: number) {
  super();
  this.connections = [];
  this.imgUrl = "assets/restCall.png";
  this.type = "rest";
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


    // initialzing custom properties
    
      this.url = '',
      // type is already in parent class;
      // this.type = '',
      this.headers = new Map<string, string>(),
      this.requestBody = new Map<string, string>(),
      this.requestUrl = '',
      this.apiType= '',
      this.httpMethod = '',
      this.methodName = ''

  
  }
}
