import {Component, computed, input, signal} from '@angular/core';
import {Player,PlayerInfo} from '@core/models';
import {PlayerSingleInfoComponent, PositionSelectorButtonsComponent} from '@shared/components';
import {PlayerFormatter, TeamFormatter} from '@shared/utils';

@Component({
  selector: 'app-team-info',
  imports: [
    PlayerSingleInfoComponent,
    PositionSelectorButtonsComponent
  ],
  templateUrl: './team-info.component.html',
  styleUrl: './team-info.component.css',
  host: {
    '[class.seattle-theme]': 'teamCode() === "SEA"',
    '[class.vegas-theme]': 'teamCode() === "LV"'
  }
})

export class TeamInfoComponent {
  readonly SALARY_CAP = 120_000_000;

  teamCode = input.required<string>();
  players = input.required<Set<Player>>();
  currentInfoSelected = signal<string>("Stats");
  infoSelector = Object.values(PlayerInfo);

  readonly sortedGroups = computed(() =>
    PlayerFormatter.getSortedPositionGroups(this.players())
  );

  readonly playersInfoSelected = computed(() =>
    this.currentInfoSelected() as PlayerInfo
  );

  readonly totalSalary = computed(() => {
    let total = 0;
    this.players().forEach(p => total += p.contract.nextSeasonEarning);
    return total;
  });

  readonly remainingPicks = computed(() => 14 - this.players().size);

  readonly averageSalaryAvailable = computed(() => {
    const remaining = this.remainingPicks();
    if (remaining <= 0) return "$0.00M";

    const budgetLeft = this.SALARY_CAP - this.totalSalary();
    const average = budgetLeft / remaining;

    return PlayerFormatter.formatSalary(average);
  });

  readonly salaryProgress = computed(() => {
    const percent = (this.totalSalary() / this.SALARY_CAP) * 100;
    return Math.min(percent, 100);
  });

  readonly teamName = computed(() => TeamFormatter.getTeamName(this.teamCode()));
  readonly teamColor = computed(() => TeamFormatter.getTeamColor(this.teamCode()));
  readonly formattedTotalSalary = computed(() => PlayerFormatter.formatSalary(this.totalSalary()));
}
