import {PlayerContract, PlayerStats} from '@core/models';
export interface Player {
  id: number;
  name: string;
  age: number;
  teamId: string;
  headShotPath: string;
  contract: PlayerContract;
  stats: PlayerStats;
}
