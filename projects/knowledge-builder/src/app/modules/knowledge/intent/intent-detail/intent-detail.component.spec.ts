import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentDetailComponent } from './intent-detail.component';

describe('IntentDetailComponent', () => {
  let component: IntentDetailComponent;
  let fixture: ComponentFixture<IntentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntentDetailComponent]
    });
    fixture = TestBed.createComponent(IntentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
