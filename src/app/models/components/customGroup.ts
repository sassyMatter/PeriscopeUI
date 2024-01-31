
import { fabric } from 'fabric';
import { Item } from './component';
import { Field } from '../formField';

export class CustomGroup extends Item {
  override connections: any[];
  imgUrl!: string;
  imageOptions!: fabric.IImageOptions;
  objects?: fabric.Object[];

  constructor(width: number, height: number,left?: number, top?: number, event?: DragEvent) {
    super();
    this.connections = [];
    this.imgUrl = "assets/databaseResized.png";
    this.type = "customGroup";
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



  }

  override loadDataToFormFields(): void {

  }

  override unloadDataFromFormFields(): void {

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
