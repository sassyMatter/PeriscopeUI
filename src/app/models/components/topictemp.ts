import { fabric } from 'fabric';
import { Item } from './component';
import { Field } from '../formField';
import { formFieldType } from '../enums/formFieldType';

export class TopicTemp extends Item {



  // override createFabricObject(width?: number, height?: number, image?: string, position?: fabric.IPoint): fabric.Object {
  //   const fabricObject = super.createFabricObject(width, height, image, position);
  //   // Add additional customization specific to Topic class


  //   return fabricObject;
  // }


  //  override createObject(componentType: string, event: DragEvent){

  // }
  override connections: any[];
  imgUrl!: string;
  imageOptions!: fabric.IImageOptions;
  objects?: fabric.Object[];

  // custom properties
  topic: string;


  override formFields: Field[] = [
    {
      "name" : "topic",
      "fieldlabel" : "Topic",
      "type" : formFieldType.SHORT_STRING,
      "value" : "TestQueue"
    },
  ];

  // override references: string[] = [];

  override references: Set<string> = new Set(["kafkaProducer"]);

  constructor(width: number, height: number, left : number, top : number) {
    super();
    this.connections = [];
    this.imgUrl = "assets/QueueResized.png";
    this.type = "queue";
    this.imageOptions = {
      width: width,
      height: height,
      left: left,
      top: top,
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


    // initializing custom topics
    this.topic = '';


  }
  override loadDataToFormFields(): void {
    for (const field of this.formFields) {
      switch (field.name) {
        case "topic":
          field.value = this.topic;
          break;

        // Add cases for any other form fields you have in the class
      }
    }
  }

  override unloadDataFromFormFields(): void {
    for (const field of this.formFields) {
      switch (field.name) {
        case "topic":
          this.topic = field.value;
          if(this.topic !== '')
            // this.references.push(this.topic);
            this.references.add(this.topic);
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
      topic: this.topic
    });

  }
}
