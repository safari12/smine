import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { GpuConfig } from 'src/app/gpu/config/gpu.config';
import { MinerConfig } from 'src/app/miner/config/miner.config';
import { Rig } from '../rig';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rig-modal',
  templateUrl: './rig.modal.component.html',
  styleUrls: ['./rig.modal.component.css']
})
export class RigModalComponent implements OnInit {
  @Input() rig: Rig;
  @Input() gpuConfigs$: Observable<GpuConfig[]>;
  @Input() minerConfigs$: Observable<MinerConfig[]>;
  @Input() loading$: Observable<boolean>;
  @Output() onCreate = new EventEmitter<Rig>();
  @Output() onUpdate = new EventEmitter<Rig>();

  form = this.fb.group({
    hostname: ['', Validators.required],
    gpu: ['', Validators.required],
    miners: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.patchForm();
  }

  get title() {
    return this.rig ? `Update Rig ${this.rig.hostname}` : 'Create Rig';
  }

  get actionTitle() {
    return this.rig ? 'Update' : 'Create';
  }

  patchForm() {
    if (this.rig) {
      this.form.patchValue({
        hostname: this.rig.hostname,
        gpu: this.rig.gpu.config._id,
        miners: _.map(this.rig.miners, m => m.config._id)
      });
    }
  }

  newRig(): Rig {
    const value = this.form.value;
    return {
      hostname: value.hostname,
      gpu: {
        config: value.gpu
      },
      miners: _.map(value.miners, m => {
        return {
          config: m
        };
      })
    };
  }

  onSubmit() {
    if (this.form.invalid) return;
    if (this.rig) {
      const rig = this.newRig();
      rig._id = this.rig._id;
      this.onUpdate.emit(rig);
    } else {
      this.onCreate.emit(this.newRig());
    }
  }

  close() {
    this.activeModal.close();
  }
}
