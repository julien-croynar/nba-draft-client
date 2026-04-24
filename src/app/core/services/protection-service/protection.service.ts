import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProtectionService {
  private readonly KEYS = {
    PROTECTED: 'nba_protected_players',
    TEAMS: 'nba_protected_team'
  };

  readonly protectedIds = signal<Set<number>>(this.loadSet<number>(this.KEYS.PROTECTED));
  readonly teamFull = signal<Set<string>>(this.loadSet<string>(this.KEYS.TEAMS));

  constructor() {
    effect(() => {
      localStorage.setItem(this.KEYS.PROTECTED, JSON.stringify([...this.protectedIds()]));
      localStorage.setItem(this.KEYS.TEAMS, JSON.stringify([...this.teamFull()]));
    });
  }

  toggleProtectionId(id: number) {
    this.protectedIds.update(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  toggleTeamProtection(teamCode: string) {
    this.teamFull.update(prev => {
      const next = new Set(prev);
      next.has(teamCode) ? next.delete(teamCode) : next.add(teamCode);
      return next;
    });
  }

  setBulkProtection(playerIds: number[], teamCodes: string[]) {
    this.protectedIds.set(new Set(playerIds));
    this.teamFull.set(new Set(teamCodes));
  }

  initProtection() {
    this.clearAll();
  }

  clearAll() {
    this.protectedIds.set(new Set());
    this.teamFull.set(new Set());
  }

  private loadSet<T>(key: string): Set<T> {
    try {
      const saved = localStorage.getItem(key);
      return saved ? new Set(JSON.parse(saved)) : new Set<T>();
    } catch (e) {
      console.error(`Error loading ${key} from storage`, e);
      return new Set<T>();
    }
  }
}
