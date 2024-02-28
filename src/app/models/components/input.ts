
import { fabric } from 'fabric';
import { Item } from './component';
import { Field } from '../formField';
import { formFieldType } from '../enums/formFieldType';

export class Input extends Item {
  override connections: any[];
  imgUrl!: string;
  imageOptions!: fabric.IImageOptions;
  objects?: fabric.Object[];

  customTypes: Map<string, string>;
 
  override formFields: Field[] = [
    {
      "name" : "inputSource",
      "fieldlabel": "Input Source",
      "type" : formFieldType.SHORT_STRING,
      "value": "",
    },
    {
      "name" : "customTypes",
      "fieldlabel": "Define Type",
      "type" : formFieldType.EXTENDIBLE_LARGE_MAP,
      "value" : new Map<String, String>(),
    },
  ];

  // override references: string[] = ["apiReference1"];

  override references: Set<string> = new Set(["apiReference"]);

  constructor(width: number, height: number, left?: number, top?: number, event?: DragEvent) {
    super();

    this.connections = [];
    this.imgUrl = "assets/big-data.png";
    this.type = "input";
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
        left: left as number +25,
        top: top as number +25,
        // left:left,
        // top:top,
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
      this.customTypes = new Map<string, string>();



  }
  


  override loadDataToFormFields(): void {
    console.log("loading data from to formFields for ", this.type);
    for (const field of this.formFields) {
      switch (field.name) {
        case "customTypes":
          console.log(this.customTypes);
          field.value = this.customTypes;
          break;


        // Add cases for any other form fields you have in the class
      }
    }
  }

  override unloadDataFromFormFields(): void {
    for (const field of this.formFields) {
      switch (field.name) {
        case "customTypes":
          this.customTypes = new Map<string, string>(Object.entries(field.value));
          // adding type reference to global scope
          for (const item of this.customTypes.keys()) {
             this.references.add(item);
          }
          break;

        // Add cases for any other form fields you have in the class
      }
    }
  }

  override toObject(propertiesToInclude?: string[] | undefined) {
    super.toObject();
    return fabric.util.object.extend(super.toObject(propertiesToInclude), {
      customTypes: this.customTypes
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
