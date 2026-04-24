import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingSelectorComponent } from '@shared/components';

describe('SortingSelectorComponent', () => {
  let component: SortingSelectorComponent;
  let fixture: ComponentFixture<SortingSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortingSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
