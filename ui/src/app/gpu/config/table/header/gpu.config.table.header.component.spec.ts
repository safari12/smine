import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { GpuConfigTableHeaderComponent } from './gpu.config.table.header.component'

describe('GpuConfigTableHeaderComponent', () => {
  let component: GpuConfigTableHeaderComponent
  let fixture: ComponentFixture<GpuConfigTableHeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GpuConfigTableHeaderComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(GpuConfigTableHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
