import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GpuConfig } from '../gpu.config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gpu-config-modal',
  templateUrl: './gpu.config.modal.component.html',
  styleUrls: ['./gpu.config.modal.component.css']
})
export class GpuConfigModalComponent implements OnInit {
  @Input() config: GpuConfig;
  @Input() loading$: Observable<boolean>;
  @Output() onCreate = new EventEmitter<GpuConfig>();
  @Output() onUpdate = new EventEmitter<GpuConfig>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    powerLimit: ['', [Validators.required, Validators.min(90)]]
  });

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    if (this.config) {
      this.form.patchValue({
        name: this.config.name,
        powerLimit: this.config.power.limit
      });
    }
  }

  get name() {
    return this.form.controls.name;
  }

  get powerLimit() {
    return this.form.controls.powerLimit;
  }

  create() {
    this.onCreate.emit(this.getConfigValue());
  }

  update() {
    const value = this.getConfigValue();
    this.config.name = value.name;
    this.config.power.limit = value.power.limit;
    this.onUpdate.emit(this.config);
  }

  getConfigValue(): GpuConfig {
    const value = this.form.value;
    return {
      name: value.name,
      power: { limit: value.powerLimit }
    };
  }

  onSubmit() {
    if (this.form.valid) {
      if (!this.config) {
        this.create();
      } else {
        this.update();
      }
    }
  }

  close() {
    this.activeModal.close();
  }
}
