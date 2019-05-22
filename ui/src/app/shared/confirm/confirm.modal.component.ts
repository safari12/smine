import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  styleUrls: ['confirm.modal.component.css'],
  templateUrl: './confirm.modal.component.html'
})
export class ConfirmModalComponent {
  @Input() title: string;
  @Input() message: string;
  @Output() onConfirm = new EventEmitter();

  constructor(private activeModal: NgbActiveModal) {}

  confirm() {
    this.onConfirm.emit();
  }

  close() {
    this.activeModal.close();
  }
}
