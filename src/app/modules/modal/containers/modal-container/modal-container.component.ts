import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent implements OnInit {

  constructor(
		public modalService: ModalService,
		) {
    }

  ngOnInit() {
    
  }

}
