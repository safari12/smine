import { Component } from '@angular/core';
import { MinerConfig } from './miner.config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MinerService } from '../miner.service';
import { MinerConfigModalComponent } from './modal/miner.config.modal.component';
import { Observable } from 'rxjs';
import { MinerConfigService } from './state/miner.config.service';
import { MinerConfigQuery } from './state/miner.config.query';

@Component({
  selector: 'app-miner-configs',
  templateUrl: './miner.config.component.html',
  styleUrls: ['./miner.config.component.css']
})
export class MinerConfigComponent {
  miners$: Observable<string[]>;
  configs$: Observable<MinerConfig[]>;

  constructor(
    private modalService: NgbModal,
    private service: MinerService,
    private configService: MinerConfigService,
    private configQuery: MinerConfigQuery
  ) {}

  ngOnInit() {
    this.configs$ = this.configQuery.selectAll();
  }

  openModal() {
    const modal = this.modalService.open(MinerConfigModalComponent, {
      size: 'lg',
      centered: true
    });
    modal.componentInstance.loading$ = this.configQuery.selectLoading();
    modal.componentInstance.miners$ = this.service.getSupported();

    return modal;
  }

  create() {
    const modal = this.openModal();
    modal.componentInstance.onCreate.subscribe(config => {
      this.configService.create(config).subscribe(() => {
        modal.close();
      });
    });
  }

  edit(config) {
    const modal = this.openModal();
    modal.componentInstance.config = config;
    modal.componentInstance.onUpdate.subscribe(config => {
      this.configService.update(config).subscribe(() => {
        modal.close();
      });
    });
  }

  delete(config) {
    this.configService.delete(config);
  }
}
