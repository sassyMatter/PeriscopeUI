import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { java, javaLanguage } from '@codemirror/lang-java';




@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  @Input() target: any;
  
  @Input() isOpen: boolean | undefined;

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  openDialog() {
    this.isOpen = true;
  }

  closeDialog() {
    this.isOpen = false;
    console.log("emitting close event");
    this.onClose.emit();
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
