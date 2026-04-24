import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftSelectionPage } from './draft-selection-page.component';

describe('DraftSelectionPage', () => {
  let component: DraftSelectionPage;
  let fixture: ComponentFixture<DraftSelectionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftSelectionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftSelectionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
