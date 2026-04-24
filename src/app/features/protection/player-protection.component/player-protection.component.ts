import {Component, computed, input} from '@angular/core';
import {Player,Team} from '@core/models';
import {FormsModule} from '@angular/forms';
import {PlayerFormatter} from '@shared/utils';

@Component({
  selector: 'app-player-protection',
  templateUrl: './player-protection.component.html',
  styleUrl: './player-protection.component.css',
  imports: [
    FormsModule
  ],
  host:{
    '[style.--team-color]': 'teamColor() || "var(--nba-blue)"'
  }
})
export class PlayerProtectionComponent {
  player = input.required<Player>();
  team = input.required<Team | undefined>();
  playerProtection = input<boolean>(false);

  readonly playerImageUrl = computed(() =>
    PlayerFormatter.getPlayerImageUrl(this.team()?.teamCode, this.player().headShotPath)
  );

  readonly logoUrl = computed(() =>
    PlayerFormatter.getTeamLogoCssUrl(this.team()?.logoUrl)
  );

  readonly teamColor = computed(() => this.team()?.primaryColor
  );

  getSalary(): string {
    let playerContract = this.player().contract;
    return PlayerFormatter.formatSalaryAndYears(playerContract);
  }

  getStats(): string {
    let playerStats = this.player().stats;
    return PlayerFormatter.formatStats(playerStats);
  }

}
