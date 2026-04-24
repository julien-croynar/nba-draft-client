import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSingleInfoComponent } from '@shared/components';

describe('PlayerSingleInfoComponent', () => {
  let component: PlayerSingleInfoComponent;
  let fixture: ComponentFixture<PlayerSingleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerSingleInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerSingleInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
