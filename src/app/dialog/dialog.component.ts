import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { java, javaLanguage } from '@codemirror/lang-java';
import { Item } from '../models/components/component';
import {MatChipsModule} from '@angular/material/chips';
import {NgFor} from '@angular/common';
import { CdkDragEnd } from '@angular/cdk/drag-drop';





@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  @Input() target: Item | undefined;
  
  @Input() isOpen: boolean | undefined;

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  openDialog() {
    this.isOpen = true;
  
  }

  references: string[] = [
    "ref1", "ref2", "ref3", "ref4", "ref1", "ref2", "ref3"
  ]

  

  closeDialog() {
    this.isOpen = false;
    console.log("emitting close event");
    this.onClose.emit();
    console.log("target :: {} ", this.target?.type)
   
    
  }

  codeMirrorOptions: any = {
    mode: java,
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    lineWrapping: false,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    theme: 'material',
  };

  query: string | undefined;


  onDragEnded(event: CdkDragEnd<any>): void {
    const element = event.source.element.nativeElement as HTMLElement;
    const transform = element.style.transform;
    const translateValues = transform.match(/-?\d+/g);

    if (translateValues && translateValues.length >= 2) {
      const left = parseInt(translateValues[0], 10);
      const top = parseInt(translateValues[1], 10);

      // Update the dialog container position or perform any desired action
      console.log('New position:', left, top);
    }
  }




  ngOnChanges(): void{
    console.log("target manipulation ", this.target);
    if(this.target?.references){
      this.references = this.target?.references;
    }
    
  }
  

  constructor() { }

  ngOnInit(): void {

    console.log("NgInit hit")
 
  }




}