import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { GpuConfigTableComponent } from './gpu.config.table.component'

describe('GpuConfigTableComponent', () => {
  let component: GpuConfigTableComponent
  let fixture: ComponentFixture<GpuConfigTableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GpuConfigTableComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GpuConfigTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
