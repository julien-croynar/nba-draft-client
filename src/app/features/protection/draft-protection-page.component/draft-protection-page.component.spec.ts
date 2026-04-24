import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftProtectionPage } from './draft-protection-page.component';

describe('DraftProtectionPageComponent', () => {
  let component: DraftProtectionPage;
  let fixture: ComponentFixture<DraftProtectionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftProtectionPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftProtectionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
