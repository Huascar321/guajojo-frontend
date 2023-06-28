import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentEditComponent } from './intent-edit.component';

describe('IntentEditComponent', () => {
  let component: IntentEditComponent;
  let fixture: ComponentFixture<IntentEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntentEditComponent]
    });
    fixture = TestBed.createComponent(IntentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
