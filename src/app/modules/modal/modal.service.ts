import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Injectable()
export class ModalService {
	@Output()
	change = new EventEmitter();

	displayModal: boolean;
	modalType: any;
	modalMode: any = 'dashboard';
	parentId: any;
	selfId: any;
	callback: any;

	constructor(
		private http: HttpClient
	) { }

	showModal(type, id, callback?) {
		this.displayModal = true;
		this.modalType = type;
		this.parentId = id;

		//console.log('SHOW MODAL');
		//console.log('SHOW MODAL: modalType-', this.modalType);
		//console.log('SHOW MODAL: parentId-', this.parentId);
		//console.log('SHOW MODAL');
	}
	hideModal() {

		if (this.callback) {
			this.callback()
		};
		this.callback = false;
		this.displayModal = false;
		this.modalType = false;
		this.parentId = false;
		this.modalMode = 'dashboard';
		//console.log('HIDE MODAL');
	}

	changeModalType(mode, id?) {
		//console.log('modalMode: ', mode)
		//console.log('modalMode ID: ', id)
		this.modalMode = mode;
		if (id) {
			this.selfId = id
		}
	}
}