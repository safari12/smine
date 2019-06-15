import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Rig } from './rig';
import RigService from './rig.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RigModalComponent } from './modal/rig.modal.component';
import MinerConfigService from '../miner/config/miner.config.service';
import { delay } from 'rxjs/operators';
import { ConfirmModalComponent } from '../shared/confirm/confirm.modal.component';
import { GpuConfigService } from '../gpu/config/state/gpu.config.service';
import { GpuConfigQuery } from '../gpu/config/state/gpu.config.query';

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
    private modalService: NgbModal,
    private minerConfigService: MinerConfigService,
    private gpuConfigQuery: GpuConfigQuery
  ) {}

  ngOnInit() {
    this.rigs$ = this.service.items$;
    this.service.readAll();
  }

  create() {
    const modal = this.openModal();
    modal.componentInstance.onCreate.subscribe(rig => {
      modal.componentInstance.loading = true;
      this.service
        .create(rig)
        .pipe(delay(500))
        .subscribe(() => {
          modal.componentInstance.loading = false;
          modal.close();
        });
    });
  }

  edit(rig: Rig) {
    const modal = this.openModal();
    modal.componentInstance.rig = rig;
    modal.componentInstance.onUpdate.subscribe(rig => {
      modal.componentInstance.loading = true;
      this.service
        .update(rig)
        .pipe(delay(500))
        .subscribe(() => {
          modal.componentInstance.loading = false;
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
      this.service.remove(rig).subscribe(() => {
        modal.close();
      });
    });
  }

  private openModal() {
    const modal = this.modalService.open(RigModalComponent, {
      size: 'lg',
      centered: true
    });
    modal.componentInstance.minerConfigs$ = this.minerConfigService.items$;
    modal.componentInstance.gpuConfigs$ = this.gpuConfigQuery.selectAll();

    return modal;
  }
}
