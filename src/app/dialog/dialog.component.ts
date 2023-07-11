import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { java, javaLanguage } from '@codemirror/lang-java';
import { Item } from '../models/components/component';
import {MatChipsModule} from '@angular/material/chips';
import {KeyValue, NgFor} from '@angular/common';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Field } from '../models/formField';
import { formFieldType } from '../models/enums/formFieldType';





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

  formFields: Field[] = [];
  

  closeDialog() {
    // need to save data into attributes
    this.isOpen = false;
    console.log("emitting close event");
    this.onClose.emit();
    console.log("target :: {} ", this.target?.type);
    if(this.target?.formFields){
      console.log(this.target.formFields + " \n" + this.formFields);
     this.target.formFields = this.formFields;
    }
   
    
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

  formFieldType = formFieldType;

  




  ngOnChanges(): void{
    console.log("target manipulation ", this.target);
    if(this.target?.references){
      this.references = this.target?.references;
    }
    if(this.target?.formFields){
      this.formFields = this.target?.formFields;
    }

  
  }


  removeEntry(key: any, fieldName: any) {
    const fieldToUpdate = this.formFields.find(field => field.name === fieldName)
    if(fieldToUpdate){
      fieldToUpdate.value.delete(key);
    }
     console.log("Removing Entry");
  }

  addEntry(arg0: any) {
     console.log("Adding Entry");
     console.log(arg0);
    const fieldToUpdate = this.formFields.find(field => field.name === arg0)
    if(fieldToUpdate){
      fieldToUpdate.value?.set("", "");
    }
     
  }


  // updating key value for the field
  previousKey :any |undefined = '';
  newKey: any | undefined = '';
  newValue: any | undefined = '';

  updateMapKey(fieldName: string) {
    // this.target?.formFields.find(field => field.name === fieldName);
    let fieldToUpdate = this.formFields.find(field => field.name === fieldName);
    if(fieldToUpdate){
    // const entries: [string, string][]  = Array.from(fieldToUpdate?.value.entries());
    // entries[index] = [newKey, entries[index][1]];
    // fieldToUpdate.value = new Map(entries);
    console.log("updating field key ", this.previousKey , "to ", this.newKey);
    
    let valueOfKey = fieldToUpdate.value.get(this.previousKey);
    console.log(this.previousKey, "keysToUpdate::",  valueOfKey, this.newKey);
     
      if(valueOfKey != undefined){
        console.log(this.previousKey, valueOfKey, this.newKey);
        // keyToUpdate.set(newKey, keyToUpdate.value);
        let value = valueOfKey;
        fieldToUpdate.value.delete(this.previousKey);
        fieldToUpdate.value.set(this.newKey, value);
        this.previousKey = this.newKey;
      }

    }

    console.log(this.target?.formFields.find(field => field.name === fieldName));
    console.log(this.formFields.find(field => field.name === fieldName));
   
  }

  callOnKeyChange(entry:KeyValue<any, any>){
    console.log("key change detected")
    this.previousKey = this.newKey;
    this.newKey = entry.key;

  }
  

  callOnValueChange(entry:KeyValue<any, any>){
    console.log("value change detected")
    console.log("updating value of the field ", entry);
    this.newValue = entry.value;
  }


  updateMapValue(key:any, fieldName: string) {
    let fieldToUpdate = this.formFields.find(field => field.name === fieldName);
    if(fieldToUpdate){
    // const entries: [string, string][]  = Array.from(fieldToUpdate.value.entries());
    // entries[index] = [entries[index][0], newValue];
    // fieldToUpdate.value = new Map(entries);
    console.log("updating field value ", key, this.newValue);
      fieldToUpdate.value.set(key, this.newValue);
    }
  
  }

  
  
  

  
  

  constructor() { }

  ngOnInit(): void {

    console.log("NgInit hit")
 
  }




}
