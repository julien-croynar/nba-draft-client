import {Component, computed, input} from '@angular/core';
import {Player,PlayerInfo} from '@core/models';
import {PlayerFormatter} from '@shared/utils';

@Component({
  selector: 'app-player-single-info',
  imports: [],
  templateUrl: './player-single-info.component.html',
  styleUrl: './player-single-info.component.css',
})
export class PlayerSingleInfoComponent {
  player = input.required<Player>();
  playerInfoSelected = input.required<PlayerInfo>();

  readonly playerImageUrl = computed(() =>{
    let player = this.player();
    return PlayerFormatter.getPlayerImageUrl(player?.teamId, player?.headShotPath)
  });

  currentPlayerInfo = computed(() =>{
    let info = this.playerInfoSelected();
    let player = this.player();
    if(!player || !info) return ``;
    switch (info){
      case PlayerInfo.AGE:
        return player.age +` yr`;
      case PlayerInfo.CONTRACT:
        return PlayerFormatter.formatSalaryAndYears(player.contract);
      case PlayerInfo.STATS:
        return PlayerFormatter.formatStats(player.stats)
    }
  });
}
