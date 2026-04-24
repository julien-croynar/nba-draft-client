import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionSelectorButtonsComponent } from '@shared/components';

describe('PositionSelectorButtonsComponent', () => {
  let component: PositionSelectorButtonsComponent;
  let fixture: ComponentFixture<PositionSelectorButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionSelectorButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PositionSelectorButtonsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
