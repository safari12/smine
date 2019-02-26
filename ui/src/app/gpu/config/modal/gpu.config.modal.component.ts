import { Component, OnInit, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-gpu-config-modal',
  templateUrl: './gpu.config.modal.component.html',
  styleUrls: ['./gpu.config.modal.component.css']
})
export class GpuConfigModalComponent {
  @Input() config: any

  configForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    cardCount: ['', [Validators.required, Validators.min(1)]],
    powerLimit: ['', [Validators.required, Validators.min(75)]],
    api: this.fb.group({
      endpoint: ['', Validators.required],
      port: ['', Validators.required],
      retries: [''],
      timeout: ['']
    })
  })
  submitted = false

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  get cf() {
    return this.configForm.controls
  }

  onSubmit() {
    this.submitted = true

    if (this.configForm.invalid) {
      return
    }

    this.activeModal.close('Close click')
  }
}
