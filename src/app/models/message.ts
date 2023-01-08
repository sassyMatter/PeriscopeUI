export class Message {
  public response: string;
  public id: number;

  constructor(res: string, id : number){
    this.response = res;
    this.id = id;
  }

}
