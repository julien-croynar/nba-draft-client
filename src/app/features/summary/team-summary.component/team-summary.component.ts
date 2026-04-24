import { Component, computed, input, signal } from '@angular/core';
import { Player,PlayerInfo } from '@core/models';
import { PlayerSingleInfoComponent, PositionSelectorButtonsComponent } from '@shared/components';
import { PlayerFormatter, TeamFormatter } from '@shared/utils';

@Component({
  selector: 'app-team-summary',
  standalone: true,
  imports: [
    PlayerSingleInfoComponent,
    PositionSelectorButtonsComponent
  ],
  templateUrl: './team-summary.component.html',
  styleUrl: './team-summary.component.css',
})
export class TeamSummaryComponent {
  teamCode = input.required<string>();
  players = input.required<Set<Player>>();

  currentInfoSelected = signal<string>("Stats");
  readonly infoSelector = Object.values(PlayerInfo);

  readonly sortedGroups = computed(() =>
    PlayerFormatter.getSortedPositionGroups(this.players())
  );

  readonly playersInfoSelected = computed(() =>
    this.currentInfoSelected() as PlayerInfo
  );

  readonly teamName = computed(() => TeamFormatter.getTeamName(this.teamCode()));
  readonly teamColor = computed(() => TeamFormatter.getTeamColor(this.teamCode()));

  readonly totalSalary = computed(() => {
    let total = 0;
    this.players().forEach(p => total += p.contract.nextSeasonEarning);
    return total;
  });

  readonly averageContractCost = computed(() => {
    const size = this.players().size;
    if (size === 0) return "$0.00M";
    return PlayerFormatter.formatSalary(this.totalSalary() / size);
  });

  readonly averageContractLength = computed(() => {
    const size = this.players().size;
    if (size === 0) return "0.0";

    let totalLength = 0;
    this.players().forEach(p => totalLength += p.contract.seasonRemaining);
    return (totalLength / size).toFixed(1);
  });

  readonly averageAge = computed(() => {
    const size = this.players().size;
    if (size === 0) return "0.0";

    let totalAge = 0;
    this.players().forEach(p => totalAge += p.age);
    return (totalAge / size).toFixed(1);
  });
}
