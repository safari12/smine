import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MinerConfig } from '../miner.config';
import { Observable } from 'rxjs';
import { Coin } from 'src/app/coin/coin';

@Component({
  selector: 'app-miner-config-modal',
  templateUrl: './miner.config.modal.component.html',
  styleUrls: ['./miner.config.modal.component.css']
})
export class MinerConfigModalComponent implements OnInit {
  @Input() config: MinerConfig;
  @Input() coins$: Observable<Coin[]>;
  @Input() miners$: Observable<string[]>;
  @Input() loading$: Observable<boolean>;
  @Output() onUpdate = new EventEmitter<MinerConfig>();
  @Output() onCreate = new EventEmitter<MinerConfig>();
  @Output() onCoinSelect = new EventEmitter<Coin>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    miner: ['', Validators.required],
    coin: ['', Validators.required],
    device: ['', Validators.required]
  });

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    if (this.config) {
      this.onCoinSelect.emit(this.config.coin);
      this.form.patchValue({
        name: this.config.name,
        miner: this.config.type,
        coin: this.config.coin,
        device: this.config.device
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
    this.config.device = value.device;
    this.onUpdate.emit(this.config);
  }

  getConfigValue(): MinerConfig {
    const value = this.form.value;
    return {
      name: value.name,
      coin: value.coin,
      type: value.miner.toLowerCase(),
      device: value.device
    };
  }

  compareCoins(c1: Coin, c2: Coin): boolean {
    return c1 && c2 && c1.name === c2.name;
  }

  onChangeCoin() {
    this.onCoinSelect.emit(this.coin.value);
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
