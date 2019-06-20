import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MinerConfig } from '../miner.config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-miner-config-modal',
  templateUrl: './miner.config.modal.component.html',
  styleUrls: ['./miner.config.modal.component.css']
})
export class MinerConfigModalComponent implements OnInit {
  @Input() config: MinerConfig;
  @Input() coins$: Observable<string[]>;
  @Input() miners$: Observable<string[]>;
  @Input() loading$: Observable<boolean>;
  @Output() onUpdate = new EventEmitter<MinerConfig>();
  @Output() onCreate = new EventEmitter<MinerConfig>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    miner: ['', Validators.required],
    coin: ['', Validators.required]
  });

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    if (this.config) {
      this.form.patchValue({
        name: this.config.name,
        miner: this.config.type,
        coin: this.config.coin
      });
    }
  }

  get name() {
    return this.form.controls.name;
  }

  get miner() {
    return this.form.controls.miner;
  }

  get coin() {
    return this.form.controls.coin;
  }

  create() {
    this.onCreate.emit(this.getConfigValue());
  }

  update() {
    const value = this.getConfigValue();
    this.config.name = value.name;
    this.config.type = value.type;
    this.config.coin = value.coin;
    this.onUpdate.emit(this.config);
  }

  getConfigValue(): MinerConfig {
    const value = this.form.value;
    return {
      name: value.name,
      coin: value.coin,
      type: value.miner
    };
  }

  onSubmit() {
    if (!this.form.invalid) {
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
