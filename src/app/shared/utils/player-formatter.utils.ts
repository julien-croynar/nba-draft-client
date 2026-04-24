import {Player, PlayerStats,PlayerContract} from '@core/models';

export type PlayerPosition = 'G' | 'F' | 'C';
export interface PositionGroup {
  key: PlayerPosition;
  players: Player[];
}
export const PlayerFormatter = {

  formatSalary(salary:number): string {
    if (!salary || salary === 0) return '$0.00M';

    const formatted = (salary / 1_000_000).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `$${formatted}M`;
  },

  formatSalaryAndYears(contract:PlayerContract): string{
    if (!contract || contract.seasonRemaining === 0) return '$0.00M - 0 yr';

    const formatted = ((contract.capHit / contract.seasonRemaining) / 1_000_000)
      .toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `$${formatted}M / ` + contract.seasonRemaining+` yr`;
  },

  formatStats(stats: PlayerStats | undefined): string {
    if (!stats) return '0 0 0';
    return `${stats.points} pts | ${stats.assists} ast | ${stats.rebound} reb`;
  },

  getPlayerImageUrl(teamCode: string | undefined, headShot: string | undefined): string {
    if (!teamCode || !headShot) return 'assets/images/default-player.png';
    return `assets/images/${teamCode}/${headShot}`;
  },

  getTeamLogoCssUrl(logoPath: string | undefined): string {
    if (!logoPath) return 'none';
    return `url(assets/logos/${logoPath})`;
  },

  groupPlayersByPosition(players: Set<Player> | undefined | null): Record<PlayerPosition, Player[]> {
    const groups: Record<PlayerPosition, Player[]> = {
      'G': [],
      'F': [],
      'C': []
    };

    if (!players) return groups;
    for (const player of players) {
      const pos = player.stats?.position?.at(-1) as PlayerPosition;
      if (pos && groups[pos]) {
        groups[pos].push(player);
      }
    }
    return groups;
  },

  getSortedPositionGroups(players: Set<Player> | undefined | null): PositionGroup[] {
    const groups = this.groupPlayersByPosition(players);

    const order: PlayerPosition[] = ['G', 'F', 'C'];

    return order.map(key => ({
      key: key,
      players: groups[key]
    }));
  }

};
