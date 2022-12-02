import { Component, Input, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ContenteditableModel } from '../../../../directives/contenteditable.directive';
import { QuestionBase } from './question-base';
import { QuestionService } from './question.service';

import { GlobalService } from '../../../../services/global.service';
import { ModalService } from '../../../../modules/modal/modal.service';
import { MediaService } from '../../../../modules/media/media.service';
import { MessagingService } from '../../../../modules/messaging/messaging.service';

import { ContextMenuService } from '../../menus/context/contextmenu.service';

@Component({
  selector: 'df-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @HostListener('document:click', ['$event'])
  public documentClick(event) {

    if (this.contextmenuService.displayMenu && (event.target.offsetParent.nodeName !== 'APP-CONTEXTMENU')) {
      //console.log(event.target.tagName !== 'span'); //.offsetParent.nodeName !== app-contextmenu);
      this.contextmenuService.displayMenu = false;
    }
  }
  @Input()
  question: QuestionBase<any>;
  @Input()
  form: FormGroup;
  @Input()
  data: any;
  @Input()
  fullForm: any;
  @Input()
  verAvailable;
  @ViewChild('inputContent')
  inputContent: any;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
  private tmpValue;
  private inputData = {};
  private subscription;
  private nRightClicks = 0;

  constructor(
    private elRef: ElementRef,
    private questionservice: QuestionService,
    private modalService: ModalService,
    private mediaService: MediaService,
    private messagingService: MessagingService,
    private globalService: GlobalService,
    private contextmenuService: ContextMenuService
  ) { }

  ngOnInit() {
    if (this.question.value && this.question.controlType === 'dropdown') {
      if (this.question.value == this.question.label) {
        this.question.selected = 0;
      }
      else {
        this.question.selected = this.question.value;
      }
    }

    this.tmpValue = this.question.value;
    this.subscription = this.mediaService.fileChange
      .subscribe(
        data => {
          if (data.key === this.question.key) {
            //console.error('FILE CHANGED IN MEDIA SERVICE: ', data)
            this.question.value = data.path;
            this.form.controls[this.question.key].setValue(data.path);
          }
        },
        err => {
          console.error('FILE CHANGED IN MEDIA SERVICE ERROR: ', err)
        }
      );
  }

  docClicked(event) {
    //console.log('CLICKED ELEMENT', event.target);
    //console.log('THIS ELEMENT: ', this.elRef.nativeElement);
  }

  onRightClick(event) {
    //console.error(event);
    //console.error(event.screenX);
    //console.error(event.screenY);

    this.contextmenuService.position = {
      x: event.screenX,
      y: event.screenY
    }
    this.contextmenuService.displayMenu = true;
    this.nRightClicks++;
    //this.getCaretPosition(event)
    return false;
  }

  getCaretPosition(event) {
    //console.log('THIS: ', event);
    //console.log('THIS: ', event.target.innerHTML);
    //console.log('THIS: ', event.target);
    //console.log('FIND CLASS: ', event.target.className === 'input-textarea');
    //console.log('NATIVE ELE: ', this.elRef.nativeElement);

    // var caretPos = 0,
    //   sel, range;
    // if (window.getSelection) {
    //   sel = window.getSelection();
    //   if (sel.rangeCount) {
    //     range = sel.getRangeAt(0);
    //     if (range.commonAncestorContainer.parentNode == editableDiv) {
    //       caretPos = range.endOffset;
    //     }
    //   }
    // }
    //console.log('SELECTION: ', window.getSelection())
    let selection = window.getSelection();
    //console.log('ANCHOR NODE: ', selection.anchorNode);
    //console.log('RANGE COUNT: ', selection.rangeCount);
    //console.log('RANGE: ', selection.getRangeAt(0))
    //console.log('CAROT: ', selection.getRangeAt(0).startOffset);
    let carotPosition = selection.getRangeAt(0).startOffset;
    let content = event.target.innerHTML;
    //let newText = 'BLAh';

    let newText = '1'

    // `<div class="dict-term"
    //   contenteditable="false"
    //   dropzone="move"
    //   draggable="true">
    //   <i class="material-icons">bookmark</i>
    //   <span>test</span>
    // </div>`

    let output = [content.slice(0, carotPosition), newText, content.slice(carotPosition)].join('');
    event.target.innerHTML = output;

    //  else if (document.selection && document.selection.createRange) {
    //   range = document.selection.createRange();
    //   if (range.parentElement() == editableDiv) {
    //     var tempEl = document.createElement("span");
    //     editableDiv.insertBefore(tempEl, editableDiv.firstChild);
    //     var tempRange = range.duplicate();
    //     tempRange.moveToElementText(tempEl);
    //     tempRange.setEndPoint("EndToEnd", range);
    //     caretPos = tempRange.text.length;
    //   }
    // }
    //return caretPos;
  }
}