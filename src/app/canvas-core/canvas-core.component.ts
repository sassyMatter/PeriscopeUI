import { Component,  OnInit } from '@angular/core';
import { Message } from '../models/message';
import { HelloWorldService } from '../services/hello-world.service';
import { CanvasService} from "../services/canvas-service";
import { fabric } from 'fabric';
import { CustomGroup } from '../models/components/customGroup';
import { ComponentProvider } from '../services/componentProvider';
import { catchError, of, tap } from 'rxjs';
import { ConnectionManager } from '../services/connnectionManager';
import { Item } from '../models/components/component';
import { ProjectService } from '../project.service';
import { Database } from '../models/components/database';


 
 
 
 
@Component({
  selector: 'canvas-core',
  templateUrl: './canvas-core.component.html',
  styleUrls: ['./canvas-core.component.css']
})
export class CanvasCoreComponent implements OnInit {
 
  public response = 'Could not connect to server!!';
 
  canvas : fabric.Canvas | null = null;
 
  isDialogOpen = false;
  targetObjectForDialog : any;

  
  
  openDialog() {
      console.log("setting isDialogOpen to true")
      this.isDialogOpen = true;
  }
 
  closeDialog() {
    console.log("setting isDialogOpen to false")
    this.isDialogOpen = false;
  }
 
  constructor(
    private helloworldService : HelloWorldService,
    private componentFactory : ComponentProvider,
    private connectionManager: ConnectionManager,
    private canvasService : CanvasService,
    private projectservice:ProjectService
   ){
 
    this.canvas = new fabric.Canvas('canvas', { renderOnAddRemove: false });
   }
 
 
  ngOnInit(): void {
    this.showServerData();

   
      console.log("running simulation");
      this.runSimulation();
    
    let createFabricObject = this.createFabricObject;
    let componentFactory = this.componentFactory;
   
    // this.changeDetectorRef.detectChanges();
 
const container = document.getElementById('canvas-container') as HTMLDivElement;
const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
 
const canvasWidth = container?.clientWidth;
const canvasHeight = container?.clientHeight;
 
console.log("canvasWidth:: " , canvasWidth);
console.log("canvasHeight:: ", canvasHeight);
 
 
// Create grid lines
// const options = {
//   distance: 10,
//   param: {
//     stroke: '#ebebeb',
//     strokeWidth: 1,
//     selectable: false
//   }
// };
 
const canvas = new fabric.Canvas(canvasElement, {
  width: canvasWidth ?? 0,
  height: canvasHeight ?? 0
});
this.canvas = canvas;
this.createGridLines(canvas, canvasWidth, canvasHeight);
 
 
 
// Set the viewport transform to allow scrolling
canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
 
// Add event listeners to handle scrolling
container.addEventListener('scroll', handleScroll);
 
// function createGridLines() {
//   const gridLen = Math.max(canvasWidth, canvasHeight) / options.distance;
 
//   for (let i = 0; i < gridLen; i++) {
//     const distance = i * options.distance;
 
//     const horizontal = new fabric.Line(
//       [distance, 0, distance, canvasHeight],
//       options.param
//     );
 
//     const vertical = new fabric.Line(
//       [0, distance, canvasWidth, distance],
//       options.param
//     );
 
//     canvas.add(horizontal);
//     canvas.add(vertical);
 
//     if (i % 5 === 0) {
//       horizontal.set({ stroke: '#cccccc' });
//       vertical.set({ stroke: '#cccccc' });
//     }
//   }
// }
 
// createGridLines();
 
function handleScroll() {
  const { scrollTop, scrollLeft } = container;
  canvas.absolutePan({ x: -scrollLeft, y: -scrollTop });
}
 
 
let isDragging = false;
let lastPosX = 0;
let lastPosY = 0;
 
canvas.on('mouse:down', function (options) {
  const evt = options.e;
  if (evt.ctrlKey === true && evt.shiftKey == true) {
    isDragging = true;
    canvas.defaultCursor = 'grabbing';
    lastPosX = evt.clientX;
    lastPosY = evt.clientY;
  }
});
 
canvas.on('mouse:move', function (options) {
  if (isDragging) {
    const e = options.e;
    const deltaX = e.clientX - lastPosX;
    const deltaY = e.clientY - lastPosY;
    canvas.relativePan({ x: deltaX, y: deltaY });
    lastPosX = e.clientX;
    lastPosY = e.clientY;
  }
});
 
canvas.on('mouse:up', function () {
  isDragging = false;
  canvas.defaultCursor = 'default';
});
 
canvas.on('mouse:wheel', function (options) {
  const delta = options.e.deltaY;
  let zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.zoomToPoint({ x: options.e.offsetX, y: options.e.offsetY }, zoom);
  options.e.preventDefault();
  options.e.stopPropagation();
});
 
// delete object on the click on delete button on the selected object
// not working
canvas.on('object:selected', (event : fabric.IEvent) =>{
 
  console.log("double click event triggered")
  const target: fabric.Object = event.target as fabric.Object;
 
  target.on('mousedown', (e: fabric.IEvent) => {
    if (e.e instanceof MouseEvent && e.e.detail === 2) {
      canvas.remove(target);
    }
  });
 
});
 
 
 
canvas.on('mouse:dblclick', (options) => {
  var event = options.e;
  var target = canvas.findTarget(event, false);
  if (target) {
    // Object is double-clicked
    console.log('Object double-clicked:', target);
    this.openDialog();
    this.targetObjectForDialog = target as Item;
 
     // Perform any desired actions
 
  }
});
 
 
 
 
canvas.on('mouse:down', (event: fabric.IEvent) => {
  console.log("drag for line")
  const target = event.target as CustomGroup;
  const mouseEvent = event.e as MouseEvent;
  const isCommandPressed = mouseEvent.metaKey;
 
 
 
 
  // Check if the target object has an ID
  if (isCommandPressed && target.id && target.left && target.width && target.top && target.height) {
    target.selectable = false;
    target.lockMovementX = true;
    target.lockMovementY = true;
    // Start drawing a line from the center of the target object
    const startingPoint = new fabric.Point(target.left + target.width / 2, target.top + target.height / 2);
 
    // Create a line and add it to the canvas
    const line = new fabric.Line([startingPoint.x, startingPoint.y, startingPoint.x, startingPoint.y], {
      stroke: 'black',
      strokeWidth: 1,
      selectable: false,
      evented: false,
    });
    canvas.add(line);
 
    // Attach an event listener to the `mouse:move` event on the canvas
    canvas.on('mouse:move', (event: fabric.IEvent) => {
      const pointer = canvas.getPointer(event.e);
      line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
    });
 
    // Attach an event listener to the `mouse:up` event on the canvas
 
    canvas.on('mouse:up', (mouseUpevent: fabric.IEvent) => {
      // Check if the line intersects with any other objects
     // getting the point
     const pointer = canvas.getPointer(event.e);
     const point = new fabric.Point(pointer.x , pointer.y);
 
     const e = mouseUpevent.e as MouseEvent;
     const isShiftKeyPressed = e.shiftKey;
 
 
 
      var isConnected = false
      const allObjects = canvas.getObjects().filter(obj=>{
        const fabricObj = obj as fabric.Object & { id?: string };
        if(fabricObj.hasOwnProperty('id')) {
          return fabricObj.id !== 'grid-lines';
        }
        return false;
      });
      console.log("all objects ", allObjects);
 
 
 
      for(let index = 0; index < allObjects.length; index++){
        const obj = allObjects.at(index) as fabric.Object;
        console.log("interating for " , obj);
 
        if(obj.containsPoint(point)){
          console.log("Intersecting");
        }
 
        console.log("obj:: ", obj, " target:: ", target);
 
        if(obj.containsPoint(point) && obj !== target){
          console.log("line intersects with :: " , obj as fabric.Group);
          console.log("target:: ", target);
          console.log("obj:: ", obj);
 
        // if (obj.name && obj.name !== target.name && line.intersectsWithObject(obj)) {
          // Perform the desired action when the line intersects with another object
          console.log("is connected ", isConnected)
          console.log("isShiftKeyPressed", isShiftKeyPressed)
          if(obj instanceof fabric.Group && target !== obj && isConnected !== true){
            console.log("drawing line");
                isConnected = true;
                const line = this.createConnectLine(target, obj, isShiftKeyPressed);
                canvas.add(line);
                canvas.renderAll();
 
          }
        }
 
        // }
        target.selectable = true;
        target.lockMovementX = false;
        target.lockMovementY = false;
      }
      console.log("Event for mouse up")
 
 
 
      // Remove the line from the canvas
      canvas.remove(line);
 
 
      console.log("setting isConnected to false");
      // Remove the event listeners
      isConnected = false;
      canvas.off('mouse:move');
      canvas.off('mouse:up');
    });
  }
});
 
 
function handleDragStart(this: HTMLImageElement, e: DragEvent): void {
  console.log("drag started:: ", e);
  const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.grid-item img');
  images.forEach((img: HTMLImageElement) => {
    img.classList.remove('img_dragging');
  });
  this.classList.add('img-dragging');
}
 
function handleDragOver(e: DragEvent): boolean {
  console.log("Drag-over")
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer!.dropEffect = 'copy';
  return false;
}
 
 
function handleDragEnter(this: HTMLElement, e: DragEvent): void {
  console.log("DragEnter")
  this.classList.add('over');
}
 
function handleDragLeave(this: HTMLElement, e: DragEvent): void {
  console.log("Drag Leave")
  this.classList.remove('over');
}
 
function handleDrop(this: HTMLElement, e: DragEvent): boolean {
  console.log("Handling drop")
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  const img: HTMLImageElement | null = document.querySelector('.grid-item img.img-dragging');
  console.log("adding img ", img);
 
  if (img) {
    console.log("id for image is", img.getAttribute("id"));
    const componentType : string  = img.getAttribute("id") as string;
    console.log("component type when dropping ", componentType);
    // const newImage = createFabricObject(componentType);
    // const image = createFabricObject2(componentType, e);
 
 
 
    console.log(img.width, img.height);
    const width = img.clientWidth;
    const height = img.clientHeight;
 
    const newImage = createFabricObject(componentType, width, height, undefined, undefined, e, undefined);
 
    console.log("adding image to canvas " , img);
    console.log(canvas.getObjects());
    canvas.add(newImage);
 
    newImage.set({
      originX: 'center',
      originY: 'center'
    });
 
    // Call `setCoords` to update the coordinates of the fabric object
    newImage.setCoords();
 
    // Render the canvas
    canvas.renderAll();
    this.classList.remove('over');
  }
 
  return false;
}
 
function handleDragEnd(this: HTMLImageElement, e: DragEvent): void {
  console.log("handling drag end")
  const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.grid-item img.img-dragging');
  images.forEach((img: HTMLImageElement) => {
    img.classList.remove('img-dragging');
  });
}
 
 
const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.grid-item img');
images.forEach((img: HTMLImageElement) => {
  img.addEventListener('dragstart', handleDragStart, false);
  img.addEventListener('dragend', handleDragEnd, false);
});
 
const canvasContainer: HTMLElement | null = document.getElementById('canvas-container');
if (canvasContainer) {
  canvasContainer.addEventListener('dragenter', handleDragEnter);
  canvasContainer.addEventListener('dragover', handleDragOver);
  canvasContainer.addEventListener('dragleave', handleDragLeave);
  canvasContainer.addEventListener('drop', handleDrop);
} else {
  alert("This browser doesn't support the HTML5 Drag and Drop API.");
}
 
 
 
 
 
// canvas.on("dragover", function(options){
//     console.log("Dragging over ", options);
 
// })
 
// canvas.on("drop", function(options){
//   console.log("Dropping over ", options);
// })
 
 
 
 
// function dragStart(event: DragEvent): void {
//   // Store the ID of the dragged element in the data transfer object
//   event.dataTransfer!.setData('text/plain', event.target.id);
// }
 
// // Attach the drag start event listener to the draggable element
// draggableElement.addEventListener('dragstart', dragStart);
 
// // Define the drop event handler
// canvas.addEventListener('drop', drop);
 
// function drop(event: DragEvent): void {
//   event.preventDefault();
//   // Get the ID of the dragged element from the data transfer object
//   const draggedElementId: string = event.dataTransfer!.getData('text/plain');
 
//   // Call a method to draw the shape based on the dragged element
//   drawShape(draggedElementId);
 
//   // Reset the cursor style
//   canvas.style.cursor = 'default';
// }
 
// // Prevent default behavior for dragover event
 
 
// // Method to draw the shape based on the dragged element
// function drawShape(draggedElementId: string): void {
//   // Get the canvas 2D context
//   const ctx: CanvasRenderingContext2D | null = canvas.getContext();
//   if (ctx) {
//     ctx.clearRect(0, 0, canvas.getWidth(), canvas.getHeight());
 
//     // Draw the shape based on the dragged element ID
//     if (draggedElementId === 'grid-item') {
//       // Draw a rectangle
//       ctx.fillStyle = 'red';
//       ctx.fillRect(50, 50, 100, 100);
//     }
//   }
// }
 
 
 
  }
 
  createFabricObject(componentType : string, width:number, height: number, left?: number, top?: number, event?: DragEvent, canvasData?: any): fabric.Group{
    console.log("calling factory");
 
    const componentProvider = new ComponentProvider();
    componentProvider.canvasData = canvasData;
    
    if(event){
      return componentProvider.createComponent(componentType, width, height, undefined, undefined, event);
    }
    console.log("component Type: ", componentType);
    return componentProvider.createComponent(componentType, width, height, left, top);
  }
 
  
 
  showServerData(){
    // this.helloworldService.getServerResponse()
    // .subscribe((data: Message) => {
    //   console.log(data.response);
    //   this.response = data.response;
    // });
  }
 
  sendCanvasDataToBackend(): void {
 
    var objects =  this.canvas?.getObjects();
 
    console.log("objects:: " , objects);
    const serializedCanvas = this.canvas?.toJSON(["id"]);
    console.log("serializedCanvas ::", serializedCanvas);
    if (serializedCanvas) {
      const filteredCanvasObjects = serializedCanvas.objects.filter(
        (obj: any) => (obj.id !== 'grid-lines' && obj.type !== 'line')
      );
 
      const filteredCanvasData = { ...serializedCanvas, objects: filteredCanvasObjects };
      console.log("filteredCanvasData :: ", filteredCanvasData);
      const serializedData = JSON.stringify(filteredCanvasData, this.replacer);
 
      // const serializedData = JSON.stringify(serializedCanvas);
      console.log("serialized Data :: " , serializedData);
      this.helloworldService.sendCanvasData(serializedData).pipe(
        tap((response: any) => {
          // Handle the response from the backend
          console.log('Post request successful', response);
        }),
        catchError((error) => {
          // Handle any errors that occur during the request
          console.error('Error occurred during post request', error);
          return of(null); // Returning a non-error observable to prevent unhandled error
        })
      ).subscribe();
    }
  }
 
 
  // these methods are used to add support for native Map object including deeply nested values
  replacer(key: any, value: any) {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }
 
  reviver(key: any, value:any) {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }
 
 
  runSimulation(){
      let canvasData = this.projectservice.currentproject.canvasData;
      if(canvasData != null){
        console.log("data coming");
        let hashMap = new Map<string, fabric.Group>();
          for(let i of canvasData['objects']) {
            let tp=i['top'];
            let lft=i['left'];
            
            let newImage: fabric.Group = this.createFabricObject(i['type'], i['width'], i['height'], lft, tp, undefined, i);
            newImage.setCoords();
            this.canvas?.add(newImage);
            hashMap.set(i['id'],newImage);
          }
          for(let i of canvasData['objects']) {
            for(let j of i['connections']){
              let src = hashMap.get(i['id']);
              let dest = hashMap.get(j['id']);
              if (src && dest) {
                const newLine = this.createConnectLine(src, dest, true);
                this.canvas?.add(newLine);
              }
            }
          }
          this.canvas?.renderAll();
 
      }
      


      // this.helloworldService.getCanvasData().pipe(
      //   tap((response: any) => {
      //     // Handle the response from the backend
      //     let components = response[0]['objects'];
      //     let hashMap = new Map<string, fabric.Group>();
      //     for(let i of components) {
      //       let tp=i['top'];
      //       let lft=i['left'];
      //       let newImage: fabric.Group = this.createFabricObject(i['type'], i['width'], i['height'], lft, tp);
      //       newImage.setCoords();
      //       this.canvas?.add(newImage);
      //       hashMap.set(i['id'],newImage);
      //     }
      //     for(let i of components) {
      //       for(let j of i['connections']){
      //         let src = hashMap.get(i['id']);
      //         let dest = hashMap.get(j['id']);
      //         if (src && dest) {
      //           const newLine = this.createConnectLine(src, dest, true);
      //           this.canvas?.add(newLine);
      //         }
      //       }
      //     }
      //     this.canvas?.setZoom(1);
      //     this.canvas?.renderAll();
 
      //   }),
      //   catchError((error) => {
      //     // Handle any errors that occur during the request
      //     console.error('Error occurred during get request', error);
      //     return of(null); // Returning a non-error observable to prevent unhandled error
      //   })
      // ).subscribe();
  }
 
  createGridLines(canvas: fabric.Canvas, width: number, height: number) {
    // Grid options
    const options = {
      distance: 10,
      param: {
        stroke: '#ebebeb',
        strokeWidth: 1,
        selectable: false,
        id: "grid-lines"
      }
    };
 
    const gridLen = Math.max(width, height) / options.distance;
 
    for (let i = 0; i < gridLen; i++) {
      const distance = i * options.distance;
 
      const horizontal = new fabric.Line(
        [distance, 0, distance, height],
        options.param,
      );
 
      const vertical = new fabric.Line(
        [0, distance, width, distance],
        options.param
      );
 
      canvas.add(horizontal);
      canvas.add(vertical);
 
      if (i % 5 === 0) {
        horizontal.set({ stroke: '#cccccc' });
        vertical.set({ stroke: '#cccccc' });
      }
    }
  }
 
 
  // creating connection lines
  updateLine(line: fabric.Line, obj1: fabric.Group, point:string) {
    const centerPoint = obj1.getCenterPoint();
    line.set({
      [`x${point}`]: centerPoint.x,
      [`y${point}`]: centerPoint.y
    });
  }
 
createConnectLine(obj1: fabric.Group, obj2: fabric.Group, directional:boolean) {
   console.log("Create line called for ", obj1, obj2);
    const centerPointSource = obj1.getCenterPoint();
    const centerPointTarget = obj2.getCenterPoint();
 
    const connectLine = new fabric.Line(
      [
        centerPointSource.x,
        centerPointSource.y,
        centerPointTarget.x,
        centerPointTarget.y
      ],
      {
        stroke: "black",
        hoverCursor: "default",
        selectable: false
      }
    );
 
    const ob = obj1 as Item;
    const oc = obj2 as Item;
 
    obj1.on("moving", () => this.updateLine(connectLine, obj1, "1"));
    obj1.on("scaling", () => this.updateLine(connectLine, obj1, "1"));
    obj2.on("moving", () => this.updateLine(connectLine, obj2, "2"));
    obj2.on("scaling", () => this.updateLine(connectLine, obj2, "2"));
 
    // updating the connections in the objects
    this.connectionManager.establishDirectionalConnection(ob, oc, !directional);
 
    return connectLine;
  }
 
}
 
 
 




 