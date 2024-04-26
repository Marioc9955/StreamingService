import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirPlanComponent } from './elegir-plan.component';

describe('ElegirPlanComponent', () => {
  let component: ElegirPlanComponent;
  let fixture: ComponentFixture<ElegirPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElegirPlanComponent]
    });
    fixture = TestBed.createComponent(ElegirPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
