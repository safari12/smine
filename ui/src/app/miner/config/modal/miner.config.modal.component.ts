import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { MinerConfig } from '../miner.config'

@Component({
  selector: 'app-miner-config-modal',
  templateUrl: './miner.config.modal.component.html',
  styleUrls: ['./miner.config.modal.component.css']
})
export class MinerConfigModalComponent implements OnInit {
  @Input() config: MinerConfig
  @Input() miners: string[]
  @Input() loading: boolean
  @Output() onUpdate = new EventEmitter<MinerConfig>()
  @Output() onCreate = new EventEmitter<MinerConfig>()

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    miner: ['', Validators.required],
    api: this.fb.group({
      endpoint: ['', Validators.required],
      port: ['', Validators.required],
      retries: ['2'],
      timeout: ['2000']
    })
  })

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    if (this.config) {
      this.form.patchValue({
        name: this.config.name,
        miner: this.config.miner,
        api: this.config.api
      })
    } else {
      this.form.patchValue({
        miner: this.miners[0]
      })
    }
  }

  get name() {
    return this.form.controls.name
  }

  get miner() {
    return this.form.controls.miner
  }

  get api() {
    return this.form.controls.api as FormGroup
  }

  get endpoint() {
    return this.api.controls.endpoint
  }

  get port() {
    return this.api.controls.port
  }

  get retries() {
    return this.api.controls.retries
  }

  get timeout() {
    return this.api.controls.timeout
  }

  create() {
    this.onCreate.emit(this.getConfigValue())
  }

  update() {
    const value = this.getConfigValue()
    this.config.name = value.name
    this.config.miner = value.miner
    this.config.api = value.api
    this.onUpdate.emit(this.config)
  }

  getConfigValue(): MinerConfig {
    const value = this.form.value
    return {
      name: value.name,
      miner: value.miner,
      api: value.api
    }
  }

  onSubmit() {
    if (!this.form.invalid) {
      if (!this.config) {
        this.create()
      } else {
        this.update()
      }
    }
  }

  close() {
    this.activeModal.close()
  }
}
