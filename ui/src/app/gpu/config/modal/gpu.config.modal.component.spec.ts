import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gpu.Config.ModalComponent } from './gpu.config.modal.component';

describe('Gpu.Config.ModalComponent', () => {
  let component: Gpu.Config.ModalComponent;
  let fixture: ComponentFixture<Gpu.Config.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gpu.Config.ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gpu.Config.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
