import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Rig } from './rig';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RigModalComponent } from './modal/rig.modal.component';
import { ConfirmModalComponent } from '../shared/confirm/confirm.modal.component';
import { GpuConfigQuery } from '../gpu/config/state/gpu.config.query';
import { MinerConfigQuery } from '../miner/config/state/miner.config.query';
import { RigService } from './state/rig.service';
import { RigQuery } from './state/rig.query';

@Component({
  selector: 'app-rigs',
  styleUrls: ['./rig.component.css'],
  templateUrl: './rig.component.html'
})
export class RigComponent implements OnInit {
  rigs$: Observable<Rig[]>;
  searchText: string;

  constructor(
    private service: RigService,
    private query: RigQuery,
    private minerConfigQuery: MinerConfigQuery,
    private gpuConfigQuery: GpuConfigQuery,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.rigs$ = this.query.selectAll();
  }

  create() {
    const modal = this.openModal();
    modal.componentInstance.onCreate.subscribe(rig => {
      this.service.create(rig).subscribe(() => {
        modal.close();
      });
    });
  }

  edit(rig: Rig) {
    const modal = this.openModal();
    modal.componentInstance.rig = rig;
    modal.componentInstance.onUpdate.subscribe(rig => {
      this.service.update(rig).subscribe(() => {
        modal.close();
      });
    });
  }

  delete(rig: Rig) {
    const modal = this.modalService.open(ConfirmModalComponent, {
      centered: true
    });
    modal.componentInstance.title = 'Deleting Rig';
    modal.componentInstance.message = `Are you sure want to delete rig ${
      rig.hostname
    }?`;
    modal.componentInstance.onConfirm.subscribe(() => {
      this.service.delete(rig).subscribe(() => {
        modal.close();
      });
    });
  }

  private openModal() {
    const modal = this.modalService.open(RigModalComponent, {
      size: 'lg',
      centered: true
    });
    modal.componentInstance.minerConfigs$ = this.minerConfigQuery.selectAll();
    modal.componentInstance.gpuConfigs$ = this.gpuConfigQuery.selectAll();
    modal.componentInstance.loading$ = this.query.selectLoading();

    return modal;
  }
}
