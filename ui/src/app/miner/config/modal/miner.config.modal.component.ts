import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { MinerConfig } from '../miner.config'
import MinerConfigService from '../miner.config.service'

@Component({
  selector: 'app-miner-config-modal',
  templateUrl: './miner.config.modal.component.html',
  styleUrls: ['./miner.config.modal.component.css']
})
export class MinerConfigModalComponent implements OnInit {
  @Input() config: MinerConfig
  @Output() updateConfigEvent = new EventEmitter<MinerConfig>()

  configForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
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
    private service: MinerConfigService
  ) {}

  ngOnInit() {
    if (this.config) {
      this.configForm.patchValue({
        name: this.config.name,
        api: this.config.api
      })
    }
  }

  get cf() {
    return this.configForm.controls
  }

  addConfig() {
    this.service.add(this.getConfigValue())
  }

  updateConfig() {
    this.updateConfigEvent.emit(this.getConfigValue())
  }

  getConfigValue(): MinerConfig {
    const value = this.configForm.value
    return {
      name: value.name,
      api: value.api
    }
  }

  onSubmit() {
    this.submitted = true

    if (this.configForm.invalid) {
      return
    }

    if (!this.config) {
      this.addConfig()
    } else {
      this.updateConfig()
    }

    this.activeModal.close('Close click')
  }
}
