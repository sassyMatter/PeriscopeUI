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
    "fieldlabel": "URL",
    "type" : formFieldType.SHORT_STRING,
    "value" : "",
  },
  {
    "name" : "type",
    "fieldlabel": "Type",
    "type" : formFieldType.DROP_DOWN,
    "options" : [],
    "value" : ""
  },
  {
    "name" : "headers",
    "fieldlabel": "Headers",
    "type" : formFieldType.EXTENDIBLE_MAP,
    "value" : new Map<string, string>([
      ["key1", "value1"],
      ["key2", "value2"]
    ])
  },
  {
    "name" : "requestBody",
    "fieldlabel": "Request Body",
    "type" : formFieldType.EXTENDIBLE_MAP,
    "value" : new Map<string, string>()
  }
  ,
  {
    "name" : "requestUrl",
    "fieldlabel": "Request URL",
    "type" : formFieldType.SHORT_STRING,
    "value" : "",
  }
  ,
  {
    "name" : "apiType",
    "fieldlabel": "API Type",
    "type" : formFieldType.DROP_DOWN,
    "options": ["PostMapping", "GetMapping"],
    "value" : "",
  }
  ,
  {
    "name" : "httpMethod",
    "fieldlabel" : "Http Method",
    "type" : formFieldType.DROP_DOWN,
    "options": ["PostMapping", "GetMapping"],
    "value": "",
  }
  ,
  {
    "name" : "methodName",
    "fieldlabel" : "Method Name",
    "type" : formFieldType.SHORT_STRING,
    "value" : ""
  }

];

// override references: string[] = [];

override references: Set<string> = new Set();

constructor(width: number, height: number, left?: number, top?: number, event?: DragEvent) {
  super();
  this.connections = [];
  this.imgUrl = "assets/restCall.png";
  this.type = "restInterface";
  if(event){
    this.imageOptions = {
      width: width + 14,
      height: height + 14,
      left: event.offsetX-25,
      top: event.offsetY-25,
      centeredScaling: true,
      originX: 'center',
      originY: 'center',
    }
  }
  else{
    this.imageOptions = {
      width: width,
      height: height,
      left: left,
      top: top,
      centeredScaling: true,
      originX: 'center',
      originY: 'center',
    }
  }

  fabric.Image.fromURL(this.imgUrl, (img) => {

    // setting image options
      img.set(this.imageOptions);

      console.log("image is : " , img);
      // Add the image to the custom group
      this.addWithUpdate(img);
      img.setCoords();
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

  override loadDataToFormFields(): void {
    console.log("loading data from to formFields for ", this.type);
    for (const field of this.formFields) {
      switch (field.name) {
        case "url":
          field.value = this.url;
          break;
        case "headers":
          field.value = this.headers;
          break;
        case "requestBody":
          field.value = this.requestBody;
          break;
        case "requestUrl":
          field.value = this.requestUrl;
          break;
        case "apiType":
          field.value = this.apiType;
          break;
        case "httpMethod":
          field.value = this.httpMethod;
          break;
        case "methodName":
          field.value = this.methodName;
          break;
        // Add cases for any other form fields you have in the class
      }
    }
  }

  override unloadDataFromFormFields(): void {
    console.log("unloading data from formFields into the object", this.formFields);
    for (const field of this.formFields) {
      switch (field.name) {
        case "url":
          this.url = field.value;
          // this.references.push(this.url);
          this.references.add(this.url);
          break;
        case "headers":
          this.headers = new Map<string, string>(field.value);
          break;
        case "requestBody":
          this.requestBody = new Map<string, string>(field.value);
          break;
        case "requestUrl":
          this.requestUrl = field.value;
          break;
        case "apiType":
          this.apiType = field.value;
          break;
        case "httpMethod":
          this.httpMethod = field.value;
          // this.references.push(this.httpMethod);
          this.references.add(this.httpMethod);
          break;
        case "methodName":
          this.methodName = field.value;
          break;
        // Add cases for any other form fields you have in the class
      }
    }
    console.log("url ", this.url);
    console.log("headers" , this.headers);
    console.log("requestBody", this.requestBody);
  }

  override toObject(propertiesToInclude?: string[] | undefined) {
    super.toObject();
    return fabric.util.object.extend(super.toObject(propertiesToInclude), {
      // already called super, do we really need it
      // connections: this.connections,
      // id: this.id,
     url: this.url,
     headers: this.headers,
     requestBody: this.requestBody,
     requestUrl: this.requestUrl,
     apiType: this.apiType,
     httpMethod: this.httpMethod,
     methodName: this.methodName
   });

 }
}
