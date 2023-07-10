import { formFieldType } from './enums/formFieldType';

export interface Field {
  name: string;
  fieldlabel: string;
  type: formFieldType;
  options?: string[];
  value?: any;
}