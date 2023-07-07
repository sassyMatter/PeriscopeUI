import { formFieldType } from './enums/formFieldType';

export interface Field {
  name: string;
  type: formFieldType;
  options?: string[];
  value?: Map<string, string>;
}