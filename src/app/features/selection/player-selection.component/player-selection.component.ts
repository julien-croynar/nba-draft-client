import {Component, computed, input, output} from '@angular/core';
import {Player} from '@core/models';
import {PlayerFormatter} from '@shared/utils';

@Component({
  selector: 'app-player-selection',
  imports: [],
  templateUrl: './player-selection.component.html',
  styleUrl: './player-selection.component.css',
})
export class PlayerSelectionComponent {
  player = input.required<Player>();
  isDraftCompleted = input.required<boolean>();
  canShowButton = computed(() => !this.isDraftCompleted());
  selectedPlayer = output<Player>()

  readonly playerImageUrl = computed(() =>{
      let player = this.player();
      return PlayerFormatter.getPlayerImageUrl(player?.teamId, player?.headShotPath)
  });
  onPlayerDraft(){
    this.selectedPlayer.emit(this.player());
  }

  getSalary(): string {
    let contract = this.player().contract;
    return PlayerFormatter.formatSalaryAndYears(contract);
  }

  getStats(): string {
    let playerStats = this.player().stats;
    return PlayerFormatter.formatStats(playerStats);
  }

}
