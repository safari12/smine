import { Component, OnInit } from '@angular/core';
import AuthService from './auth/auth.service';
import User from './user/user';
import { GpuConfigService } from './gpu/config/state/gpu.config.service';
import { MinerConfigService } from './miner/config/state/miner.config.service';
import { RigService } from './rig/state/rig.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'smine-ui';

  constructor(
    private authService: AuthService,
    private rigService: RigService,
    private gpuConfigService: GpuConfigService,
    private minerConfigService: MinerConfigService
  ) {}

  ngOnInit() {
    this.rigService.readAll();
    this.gpuConfigService.readAll();
    this.minerConfigService.readAll();
  }

  get currentUser(): User {
    return this.authService.getCurrentUser;
  }
}
