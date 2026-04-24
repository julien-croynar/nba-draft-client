import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerProtectionComponent } from './player-protection.component';

describe('PlayerProtectionComponent', () => {
  let component: PlayerProtectionComponent;
  let fixture: ComponentFixture<PlayerProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerProtectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerProtectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
