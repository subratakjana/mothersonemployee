import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsDocsComponent } from './assets-docs.component';

describe('AssetsDocsComponent', () => {
  let component: AssetsDocsComponent;
  let fixture: ComponentFixture<AssetsDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetsDocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetsDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
