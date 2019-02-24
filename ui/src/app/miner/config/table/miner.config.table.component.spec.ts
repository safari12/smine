import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MinerConfigTableComponent } from './miner.config.table.component'

describe('MinerConfigTableComponent', () => {
  let component: MinerConfigTableComponent
  let fixture: ComponentFixture<MinerConfigTableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MinerConfigTableComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MinerConfigTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
