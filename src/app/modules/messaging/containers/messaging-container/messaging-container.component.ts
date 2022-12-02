import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../messaging.service';

@Component({
  selector: 'app-messaging-container',
  templateUrl: './messaging-container.component.html',
  styleUrls: ['./messaging-container.component.scss']
})
export class MessagingContainerComponent implements OnInit {

  constructor(
    public messagingService: MessagingService
  ) { }

  ngOnInit() {
    
  }

}
