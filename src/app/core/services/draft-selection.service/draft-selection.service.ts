import {computed, effect, Injectable, signal} from '@angular/core';
import { Player } from '@core/models';

@Injectable({ providedIn: 'root' })
export class DraftSelectionService {
  private readonly KEYS = {
    INITIAL_POOL: 'initial_unprotected_pool',
    SEATTLE: 'seattle-players',
    VEGAS: 'las-vegas-players',
    TEAMS: 'team_available',
    ORDER: 'picks-order'
  };

  private readonly initialPool = signal<Player[]>(this.loadInitialPool());

  readonly teamsAvailable = signal<Set<string>>(this.loadSet(this.KEYS.TEAMS));
  readonly seattlePlayers = signal<Set<Player>>(this.loadSet(this.KEYS.SEATTLE));
  readonly lasVegasPlayers = signal<Set<Player>>(this.loadSet(this.KEYS.VEGAS));
  readonly picksOrder = signal<Player[]>(this.loadPicksOrder());

  readonly playersAvailable = computed(() => {
    const teamsInPool = this.teamsAvailable();
    return this.initialPool().filter(p => teamsInPool.has(p.teamId));
  });

  readonly isSeattleTurn = computed(() => this.picksOrder().length % 2 === 0);

  constructor() {
    effect(() => {
      localStorage.setItem(this.KEYS.INITIAL_POOL, JSON.stringify(this.initialPool()));
      localStorage.setItem(this.KEYS.SEATTLE, JSON.stringify([...this.seattlePlayers()]));
      localStorage.setItem(this.KEYS.VEGAS, JSON.stringify([...this.lasVegasPlayers()]));
      localStorage.setItem(this.KEYS.TEAMS, JSON.stringify([...this.teamsAvailable()]));
      localStorage.setItem(this.KEYS.ORDER, JSON.stringify(this.picksOrder()));
    });
  }

  initDraft(unprotectedPlayers: Player[]) {
    this.initialPool.set(unprotectedPlayers);

    const teamIds = new Set(unprotectedPlayers.map(p => p.teamId));
    this.teamsAvailable.set(teamIds);

    this.seattlePlayers.set(new Set());
    this.lasVegasPlayers.set(new Set());
    this.picksOrder.set([]);
  }

  togglePlayerDraft(player: Player, isSeattle: boolean) {
    this.teamsAvailable.update(prev => {
      const next = new Set(prev);
      next.delete(player.teamId);
      return next;
    });

    if (isSeattle) {
      this.seattlePlayers.update(prev => new Set(prev).add(player));
    } else {
      this.lasVegasPlayers.update(prev => new Set(prev).add(player));
    }

    this.picksOrder.update(prev => [...prev, player]);
  }

  removeLastPick() {
    const history = this.picksOrder();
    if (history.length === 0) return;

    const lastPlayer = history[history.length - 1];
    const wasSeattlePick = (history.length - 1) % 2 === 0;

    const removeFromSet = (prev: Set<Player>) => {
      const next = new Set(prev);
      for (const p of next) { if (p.id === lastPlayer.id) { next.delete(p); break; } }
      return next;
    };

    if (wasSeattlePick) this.seattlePlayers.update(removeFromSet);
    else this.lasVegasPlayers.update(removeFromSet);

    this.teamsAvailable.update(prev => new Set(prev).add(lastPlayer.teamId));
    this.picksOrder.update(prev => prev.slice(0, -1));
  }

  private loadInitialPool(): Player[] {
    const saved = localStorage.getItem(this.KEYS.INITIAL_POOL);
    return saved ? JSON.parse(saved) : [];
  }

  private loadSet<T>(key: string): Set<T> {
    const saved = localStorage.getItem(key);
    return saved ? new Set(JSON.parse(saved)) : new Set<T>();
  }

  private loadPicksOrder(): Player[] {
    const saved = localStorage.getItem(this.KEYS.ORDER);
    return saved ? JSON.parse(saved) : [];
  }
}
