import { fabric } from 'fabric';
import { Item } from './component';
import { Field } from '../formField';
import { formFieldType } from '../enums/formFieldType';

export class Database extends Item {
  override connections: any[];

  override formFields: Field[] = [
    {
      "name" : "tableNames",
      "fieldlabel": "Table Names(comma separated)",
      "type" : formFieldType.SHORT_STRING,
      "value": "",
    },
    {
      "name" : "tableDefinitions",
      "fieldlabel": "Editor",
      "type" : formFieldType.CODE_EDITOR,
      "value": ``,
    }
  ];

  override references: Set<string> = new Set(["jdbcTemplate"]);

  imgUrl!: string;
  imageOptions!: fabric.IImageOptions;
  objects?: fabric.Object[];

  tableNames!: string[];
  tableDefinitions!: string[];

  constructor(width: number, height : number, tableName?: string, tableDefintion?: string, left?: number, top?: number, event?: DragEvent) {
    super();
    this.connections = [];
    this.imgUrl = "assets/databaseResized.png";
    this.type = "database";
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
      this.tableDefinitions=[];
      this.tableNames=[];
      this.tableNames?.push(tableName as string);
      this.tableDefinitions?.push(tableDefintion as string);

    }


    fabric.Image.fromURL(this.imgUrl, (img) => {

      // setting image options
      img.set(this.imageOptions);

      // console.log("image is : " , img);
      // Add the image to the custom group
      this.addWithUpdate(img);
      img.setCoords();
      // // Set the connections property
      // this.connections = connections;

      // Render the custom group
      // this.canvas?.renderAll();
    });
  }
  override unloadDataFromFormFields(): void {
    console.log("loading data from to formFields for ", this.type);
    for (const field of this.formFields) {
      switch (field.name) {
        case "tableNames":
          this.tableNames = field.value.split(","); // Split the comma-separated values into an array
          // this.references.push(...this.tableNames);
          this.tableNames.forEach((name) => this.references.add(name));
          break;
        case "tableDefinitions":
          this.tableDefinitions = field.value.split("$"); // Assign the value to the tableDefinitions array
          break;
        // Add cases for any other form fields you have in the class
      }
    }
  }

  setAttributes(){

  }

  override loadDataToFormFields(): void {
    for (const field of this.formFields) {
      switch (field.name) {
        case "tableNames":
          field.value = this.tableNames.join(","); // Join the tableNames array into a comma-separated string
          break;
        case "tableDefinitions":
          field.value = this.tableDefinitions.join("$");
          // Assign the first value from tableDefinitions to the field value
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
      tableNames : this.tableNames,
      tableDefinitions: this.tableDefinitions


    });

  }
}
