import { Component, OnInit, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import GpuConfigService from '../gpu.config.service'
import { GpuConfig } from '../gpu.config'

@Component({
  selector: 'app-gpu-config-modal',
  templateUrl: './gpu.config.modal.component.html',
  styleUrls: ['./gpu.config.modal.component.css']
})
export class GpuConfigModalComponent implements OnInit {
  @Input() config: GpuConfig

  configForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    cardCount: ['', [Validators.required, Validators.min(1)]],
    powerLimit: ['', [Validators.required, Validators.min(75)]],
    api: this.fb.group({
      endpoint: ['', Validators.required],
      port: ['', Validators.required],
      retries: ['2'],
      timeout: ['2000']
    })
  })

  submitted = false

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private service: GpuConfigService
  ) {}

  ngOnInit() {
    if (this.config) {
      this.configForm.patchValue({
        name: this.config.name,
        cardCount: this.config.card.count,
        powerLimit: this.config.power.limit,
        api: this.config.api
      })
    }
  }

  get cf() {
    return this.configForm.controls
  }

  onSubmit() {
    this.submitted = true

    if (this.configForm.invalid) {
      return
    }

    const value = this.configForm.value

    this.service.add({
      name: value.name,
      api: value.api,
      card: { count: value.cardCount },
      power: { limit: value.powerLimit }
    })

    this.activeModal.close('Close click')
  }
}
