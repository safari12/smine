import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MinerConfigModalComponent } from './miner.config.modal.component'

describe('MinerConfigModalComponent', () => {
  let component: MinerConfigModalComponent
  let fixture: ComponentFixture<MinerConfigModalComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MinerConfigModalComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MinerConfigModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
