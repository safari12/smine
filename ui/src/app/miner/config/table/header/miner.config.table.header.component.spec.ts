import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MinerConfigTableHeaderComponent } from './miner.config.table.header.component'

describe('MinerConfigTableHeaderComponent', () => {
  let component: MinerConfigTableHeaderComponent
  let fixture: ComponentFixture<MinerConfigTableHeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MinerConfigTableHeaderComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MinerConfigTableHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
