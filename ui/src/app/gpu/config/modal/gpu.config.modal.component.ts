import { Component, OnInit, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-gpu-config-modal',
  templateUrl: './gpu.config.modal.component.html',
  styleUrls: ['./gpu.config.modal.component.css']
})
export class GpuConfigModalComponent {
  @Input() config: any

  constructor(public activeModal: NgbActiveModal) {}
}
