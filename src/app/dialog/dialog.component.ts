import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { java, javaLanguage } from '@codemirror/lang-java';
import { Item } from '../models/components/component';




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

  

  constructor() { }

  ngOnInit(): void {
 
  }




}
