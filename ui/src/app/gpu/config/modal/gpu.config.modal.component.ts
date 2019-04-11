import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import GpuConfigService from '../gpu.config.service'
import { GpuConfig } from '../gpu.config'
import { delay } from 'rxjs/operators'

@Component({
  selector: 'app-gpu-config-modal',
  templateUrl: './gpu.config.modal.component.html',
  styleUrls: ['./gpu.config.modal.component.css']
})
export class GpuConfigModalComponent implements OnInit {
  @Input() config: GpuConfig
  @Output() updateConfigEvent = new EventEmitter<GpuConfig>()

  configForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    powerLimit: ['', [Validators.required, Validators.min(90)]]
  })

  loading = false

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private service: GpuConfigService
  ) {}

  ngOnInit() {
    if (this.config) {
      this.configForm.patchValue({
        name: this.config.name,
        powerLimit: this.config.power.limit
      })
    }
  }

  get name() {
    return this.configForm.controls.name
  }

  get powerLimit() {
    return this.configForm.controls.powerLimit
  }

  addConfig() {
    this.loading = true
    this.service
      .create(this.getConfigValue())
      .pipe(delay(1000))
      .subscribe(() => {
        this.loading = false
        this.activeModal.close('Close click')
      })
  }

  updateConfig() {
    const value = this.getConfigValue()
    this.loading = true
    this.config.name = value.name
    this.config.power = value.power
    this.service
      .update(this.config)
      .pipe(delay(1000))
      .subscribe(() => {
        this.loading = false
        this.activeModal.close('Close click')
      })
  }

  getConfigValue(): GpuConfig {
    const value = this.configForm.value
    return {
      name: value.name,
      power: { limit: value.powerLimit }
    }
  }

  onSubmit() {
    if (!this.configForm.invalid) {
      if (!this.config) {
        this.addConfig()
      } else {
        this.updateConfig()
      }
    }
  }

  onClose() {
    this.activeModal.close('Close click')
  }
}
