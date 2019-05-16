import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Rig } from './rig';
import RigService from './rig.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RigModalComponent } from './modal/rig.modal.component';
import MinerConfigService from '../miner/config/miner.config.service';
import GpuConfigService from '../gpu/config/gpu.config.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-rigs',
  styleUrls: ['./rig.component.css'],
  templateUrl: './rig.component.html'
})
export class RigComponent implements OnInit {
  rigs$: Observable<Rig[]>;

  constructor(
    private service: RigService,
    private modalService: NgbModal,
    private minerConfigService: MinerConfigService,
    private gpuConfigService: GpuConfigService
  ) {}

  ngOnInit() {
    this.rigs$ = this.service.items$;
    this.service.readAll();
    this.gpuConfigService.readAll();
    this.minerConfigService.readAll();
  }

  create() {
    const modal = this.modalService.open(RigModalComponent, {
      size: 'lg',
      centered: true
    });
    modal.componentInstance.minerConfigs$ = this.minerConfigService.items$;
    modal.componentInstance.gpuConfigs$ = this.gpuConfigService.items$;
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
}
