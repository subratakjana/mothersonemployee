import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankPfEsiComponent } from './bank-pf-esi.component';

describe('BankPfEsiComponent', () => {
  let component: BankPfEsiComponent;
  let fixture: ComponentFixture<BankPfEsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankPfEsiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankPfEsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
