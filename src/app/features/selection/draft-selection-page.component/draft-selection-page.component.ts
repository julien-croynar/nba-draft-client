import {Component, computed, inject, signal} from '@angular/core';
import {Player,SortingModel} from '@core/models';
import {PlayerSelectionComponent} from '../player-selection.component/player-selection.component';
import {PositionSelectorButtonsComponent , SortingSelectorComponent} from '@shared/components';
import {TeamInfoComponent} from '../team-info.component/team-info.component';
import {DraftSelectionService} from '@core/services';
import {Router} from '@angular/router';
import {TeamFormatter} from '@shared/utils';

type SortKey = 'team' | 'salary' | 'contract' | 'position' | 'points' | 'rebonds' | 'assists';
const DRAFT_SORT_OPTIONS: SortingModel[] = [
  { value: 'team', name: 'Original Team' },
  { value: 'salary', name: 'Salary' },
  { value: 'contract', name: 'Years Remaining' },
  { value: 'position', name: 'Position' },
  { value: 'points', name: 'Points (pts)' },
  { value: 'rebonds', name: 'Rebounds (reb)' },
  { value: 'assists', name: 'Assists (ast)' },
];

@Component({
  selector: 'app-draft-selection-page',
  imports: [
    PlayerSelectionComponent,
    PositionSelectorButtonsComponent,
    SortingSelectorComponent,
    TeamInfoComponent
  ],
  host: {
    '[style.--active-color]': 'turnInfo().color'
  },
  templateUrl: './draft-selection-page.component.html',
  styleUrl: './draft-selection-page.component.css',
})
export class DraftSelectionPage {
  private readonly TOTAL_PICKS_REQUIRED = 28;
  private readonly router = inject(Router);
  private readonly draftService = inject(DraftSelectionService);
  readonly sortOptions = DRAFT_SORT_OPTIONS;

  readonly playersAvailable = this.draftService.playersAvailable;
  readonly seattlePlayers = this.draftService.seattlePlayers;
  readonly lasVegasPlayers = this.draftService.lasVegasPlayers;

  currentSelection = signal<string>('ALL');
  currentSorting = signal<SortKey>('team');

  readonly picksMade = computed(() => this.seattlePlayers().size + this.lasVegasPlayers().size);
  readonly isDraftCompleted = computed(() => this.picksMade() === this.TOTAL_PICKS_REQUIRED);

  readonly isSeattleTurn = computed(() => this.lasVegasPlayers().size >= this.seattlePlayers().size);

  readonly turnInfo = computed(() => {
    const code = this.isSeattleTurn() ? 'SEA' : 'LV';
    return {
      code,
      name: TeamFormatter.getTeamName(code),
      color: TeamFormatter.getTeamColor(code)
    };
  });

  readonly playersShow = computed(() => {
    const filter = this.currentSelection();
    const sortBy = this.currentSorting();

    let filtered = [... this.playersAvailable()];
    if (filter !== 'ALL') {
      filtered = filtered.filter(p => p.stats?.position?.at(-1) === filter);
    }

    return filtered.sort((a, b) => this.sortStrategy[sortBy](a, b));
  });

  private readonly sortStrategy: Record<SortKey, (a: Player, b: Player) => number> = {
    team: (a, b) => a.teamId.localeCompare(b.teamId),
    salary: (a, b) => (b.contract?.capHit ?? 0) - (a.contract?.capHit ?? 0),
    contract: (a, b) => (b.contract?.seasonRemaining ?? 0) - (a.contract?.seasonRemaining ?? 0),
    position: (a, b) => (a.stats?.position ?? '').localeCompare(b.stats?.position ?? ''),
    points: (a, b) => (b.stats?.points ?? 0) - (a.stats?.points ?? 0),
    rebonds: (a, b) => (b.stats?.rebound ?? 0) - (a.stats?.rebound ?? 0),
    assists: (a, b) => (b.stats?.assists ?? 0) - (a.stats?.assists ?? 0),
  };

  handlePlayerSelected(player: Player) {
    if (this.isDraftCompleted()) return;
    this.draftService.togglePlayerDraft(player, this.isSeattleTurn());
  }

  cancelLastPick() {
    this.draftService.removeLastPick();
  }

  validateDraft(){
    this.router.navigate(['summary']);
  }
  goBack() {
    this.router.navigate(['protection']);
  }

}
