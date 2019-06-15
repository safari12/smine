import { Component, OnInit } from '@angular/core';
import AuthService from './auth/auth.service';
import User from './user/user';
import { GpuConfigService } from './gpu/config/state/gpu.config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'smine-ui';

  constructor(
    private authService: AuthService,
    private gpuConfigService: GpuConfigService
  ) {}

  ngOnInit() {
    this.gpuConfigService.readAll();
  }

  get currentUser(): User {
    return this.authService.getCurrentUser;
  }
}
