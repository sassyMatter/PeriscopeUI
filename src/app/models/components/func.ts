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

  // custom properties
  parameters: Map<string, string>;
  returnType: string;
  functionBody: string;
  functionName: string;
  topic: string;
  deserializationClass: string;
  functionType: string;


  override formFields: Field[] = [
    {
      "name": "functionType",
      "fieldlabel": "Function Type",
      "type": formFieldType.DROP_DOWN,
      "options": ["Vanilla", "Consumer", "Producer", "Consumer-Producer"],
      "value": "",
    },
    {
      "name" : "functionName",
      "fieldlabel": "Function Name",
      "type" : formFieldType.SHORT_STRING,
      "value" : "toCamelCase",
    },
    {
      "name" : "parameters",
      "fieldlabel": "Parameters",
      "type" : formFieldType.EXTENDIBLE_MAP,
      "value" : new Map<String, String>(
        [
          ["String", "input"],
        ]
      ),
    },
    {
      "name" : "functionBody",
      "fieldlabel": "Function Body",
      "type" : formFieldType.CODE_EDITOR,
      "value" : `String[] words = input.split("[^\\w]+");
      StringBuilder camelCaseBuilder = new StringBuilder(words[0].toLowerCase());
      for (int i = 1; i < words.length; i++) {
          camelCaseBuilder.append(words[i].substring(0, 1).toUpperCase()).append(words[i].substring(1).toLowerCase());
      }
      return camelCaseBuilder.toString();`,
    },
    {
      "name" : "returnType",
      "fieldlabel": "Return Type",
      "type" : formFieldType.SHORT_STRING,
      "value" : "String"
    },
    {
      "name" : "topic",
      "fieldlabel" : "Topic",
      "type" : formFieldType.SHORT_STRING,
      "value" : ""
    },
    {
      "name" : "deserializationClass",
      "fieldlabel": "Deserialization Type",
      "type" : formFieldType.SHORT_STRING,
      "value" : "String"
    }
  ];

  // override references: string[] = [];

  override references: Set<string> = new Set();


  constructor(width: number, height: number,left?: number, top?: number, event?: DragEvent) {
    super();
    this.connections = [];
    this.imgUrl = "assets/LamdaResize.png";
    this.type = "function";
    this.imageOptions = event ? {
      width: width + 14,
      height: height + 14,
      left: event.offsetX - 25,
      top: event.offsetY - 25,
      centeredScaling: true,
      originX: 'center',
      originY: 'center',
    } : {
      width: width,
      height: height,
      left: left,
      top: top,
      centeredScaling: true,
      originX: 'center',
      originY: 'center',
    };


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


      // initializing custom properties
      this.parameters = new Map<string, string>();
      this.returnType = '';
      this.functionBody = '';
      this.functionName = '';
      this.topic = '';
      this.deserializationClass = '';
      this.functionType = '';


  }

  override loadDataToFormFields(): void {
    for (const field of this.formFields) {
      switch (field.name) {
        case "functionType":
          field.value = this.functionType;
          break;
        case "functionName":
          field.value = this.functionName;
          break;
        case "functionBody":
          field.value = this.functionBody;
          break;
        case "parameters":
          field.value = this.parameters;
          break;
        case "returnType":
          field.value = this.returnType;
          break;
        case "topic":
          field.value = this.topic;
          break;
        case "deserializationClass":
          field.value = this.deserializationClass;
          break;
        // Add cases for any other form fields you have in the class
      }
    }
  }

  override unloadDataFromFormFields(): void {
    for (const field of this.formFields) {
      switch (field.name) {
        case "functionType":
          this.functionType = field.value;
          break;
        case "functionName":
          this.functionName = field.value;
          // this.references.push(this.functionName);
          if(this.functionName !== '')
            this.references.add(this.functionName);
          break;
        case "functionBody":
          this.functionBody = field.value;
          break;
        case "parameters":
          this.parameters = new Map<string, string>(field.value);
          break;
        case "returnType":
          this.returnType = field.value;
          break;
        case "topic":
          this.topic = field.value;
          // this.references.push(this.topic);
          if(this.topic !== '')
          this.references.add(this.topic);
          break;
        case "deserializationClass":
          this.deserializationClass = field.value;
          break;
        // Add cases for any other form fields you have in the class
      }
    }
  }

  override toObject(propertiesToInclude?: string[] | undefined) {
     super.toObject();
     return fabric.util.object.extend(super.toObject(propertiesToInclude), {
      // already called super, do we really need it
      // connections: this.connections,
      // id: this.id,
      functionBody: this.functionBody,
      functionName: this.functionName,
      functionType: this.functionType,
      parameters: this.parameters,
      returnType: this.returnType,
      topic: this.topic,
      deserializationClass: this.deserializationClass

    });
  }


}


