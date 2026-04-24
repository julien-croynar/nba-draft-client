export const EXPANSION_TEAMS: Record<string, { name: string, color: string }> = {
  'SEA': {
    name: 'Seattle Supersonics',
    color: '#00653a'
  },
  'LV': {
    name: 'Las Vegas Parano',
    color: '#f3bd77'
  }
};

export const TeamFormatter = {
  getTeamName(code: string): string {
    return EXPANSION_TEAMS[code]?.name ?? 'Unknown Team';
  },

  getTeamColor(code: string): string {
    return EXPANSION_TEAMS[code]?.color ?? '#cccccc';
  }
};
