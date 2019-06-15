import { Component, OnInit } from '@angular/core';
import { GpuConfig } from './gpu.config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GpuConfigModalComponent } from './modal/gpu.config.modal.component';
import { Observable } from 'rxjs';
import { GpuConfigService } from './state/gpu.config.service';
import { GpuConfigQuery } from './state/gpu.config.query';

@Component({
  selector: 'app-gpu-configs',
  templateUrl: './gpu.config.component.html',
  styleUrls: ['./gpu.config.component.css']
})
export class GpuConfigComponent implements OnInit {
  configs$: Observable<GpuConfig[]>;

  constructor(
    private modalService: NgbModal,
    private service: GpuConfigService,
    private query: GpuConfigQuery
  ) {}

  ngOnInit() {
    this.configs$ = this.query.selectAll();
  }

  openModal() {
    const modal = this.modalService.open(GpuConfigModalComponent, {
      size: 'lg',
      centered: true
    });
    modal.componentInstance.loading$ = this.query.selectLoading();

    return modal;
  }

  create() {
    const modal = this.openModal();
    modal.componentInstance.onCreate.subscribe(config => {
      this.service.create(config).subscribe(() => {
        modal.close();
      });
    });
  }

  edit(config: GpuConfig) {
    const modal = this.openModal();
    modal.componentInstance.config = config;
    modal.componentInstance.onUpdate.subscribe(config => {
      this.service.update(config).subscribe(() => {
        modal.close();
      });
    });
  }

  delete(config: GpuConfig) {
    this.service.delete(config).subscribe();
  }
}
