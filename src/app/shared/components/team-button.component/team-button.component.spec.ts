import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamButtonComponent } from '@shared/components';

describe('TeamButtonComponent', () => {
  let component: TeamButtonComponent;
  let fixture: ComponentFixture<TeamButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
