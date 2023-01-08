import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { HelloWorldService } from '../services/hello-world.service';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  public response = 'Could not connect to server!!';

  

  constructor(
    private helloworldService : HelloWorldService,
    private changeDetectorRef: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    // this.showServerData();
    // this.changeDetectorRef.detectChanges();
   
  }

  showServerData(){
    this.helloworldService.getServerResponse()
    .subscribe((data: Message) => {
      console.log(data.response);
      this.response = data.response;
    });
    
  
    
  }

}
