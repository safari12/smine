import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import * as _ from 'lodash'
import { GpuConfig } from 'src/app/gpu/config/gpu.config'
import { MinerConfig } from 'src/app/miner/config/miner.config'
import Rig from '../rig'

@Component({
  selector: 'app-rig-modal',
  templateUrl: './rig.modal.component.html',
  styleUrls: ['./rig.modal.component.css']
})
export class RigModalComponent {
  @Input() gpuConfigs: GpuConfig[]
  @Input() minerConfigs: MinerConfig[]
  @Input() loading: boolean = false
  @Output() onCreate = new EventEmitter<Rig>()

  form = this.fb.group({
    hostname: ['', Validators.required],
    gpu: ['', Validators.required],
    miners: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) {}

  newRig(): Rig {
    const value = this.form.value
    return {
      hostname: value.hostname,
      gpu: {
        config: value.gpu
      },
      miners: _.map(value.miners, m => {
        return {
          config: m
        }
      })
    }
  }

  onSubmit() {
    if (this.form.invalid) return
    this.onCreate.emit(this.newRig())
  }
}
