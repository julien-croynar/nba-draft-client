import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService,PlayerService,ProtectionService,DraftSelectionService } from '@core/services';
import { TeamButtonComponent } from '@shared/components';
import { PlayerProtectionComponent } from '../player-protection.component/player-protection.component';
import { MatButtonModule } from '@angular/material/button';
import {TeamFormatter} from '@shared/utils';

@Component({
  selector: 'app-draft-protection-page',
  standalone: true,
  imports: [
    TeamButtonComponent,
    PlayerProtectionComponent,
    MatButtonModule
  ],
  host: {
    '[style.--team-color]': 'teamColor() || "var(--nba-blue)"'
  },
  templateUrl: './draft-protection-page.component.html',
  styleUrl: './draft-protection-page.component.css',
})
export class DraftProtectionPage {
  readonly PROTECTION_LIMIT = 8;

  private readonly teamService = inject(TeamService);
  private readonly playerService = inject(PlayerService);
  private readonly router = inject(Router);
  private readonly draftService = inject(DraftSelectionService);
  private readonly protectionService = inject(ProtectionService);

  readonly teamCode = input.required<string>();

  readonly teams = this.teamService.allTeam;

  readonly selectedTeam = computed(() =>
    this.teams()?.find(t => t.teamCode === this.teamCode())
  );

  readonly teamColor = computed(() => this.selectedTeam()?.primaryColor);

  readonly selectedPlayers = computed(() =>
    this.playerService.getPlayersByTeamCode(this.teamCode())
  );

  readonly maxForCurrentTeam = computed(() => {
    const total = this.selectedPlayers().length;
    if (total === 0) return 0;
    return Math.min(this.PROTECTION_LIMIT, total - 1);
  });

  readonly currentProtectedCount = computed(() => {
    const protectedIds = this.protectionService.protectedIds();
    return this.selectedPlayers().filter(p => protectedIds.has(p.id)).length;
  });

  readonly progressInfo = computed(() => ({
    fullTeams: this.protectionService.teamFull().size,
    totalTeams: this.teams()?.length || 0,
    isComplete: this.protectionService.teamFull().size === (this.teams()?.length || 0)
  }));

  isProtected(playerId: number): boolean {
    return this.protectionService.protectedIds().has(playerId);
  }

  toggleProtection(playerId: number) {
    const isCurrentlyProtected = this.isProtected(playerId);
    const max = this.maxForCurrentTeam();
    const current = this.currentProtectedCount();

    if (!isCurrentlyProtected && current >= max) {
      console.warn(`Limite de ${max} joueurs atteinte.`);
      return;
    }

    this.protectionService.toggleProtectionId(playerId);
    this.updateTeamFullState();
  }

  private updateTeamFullState() {
    const isFullNow = this.currentProtectedCount() >= this.maxForCurrentTeam();
    const team = this.teamCode();

    if (isFullNow !== this.protectionService.teamFull().has(team)) {
      this.protectionService.toggleTeamProtection(team);
    }
  }

  toggleAutoSelectPlayers() {
    if (this.progressInfo().isComplete) {
      this.protectionService.clearAll();
      return;
    }

    const allTeams = this.teams();
    if (!allTeams) return;

    const playerIdsToProtect: number[] = [];
    const teamsToMarkFull: string[] = [];

    allTeams.forEach(team => {
      const ids = this.playerService.getPlayersIdByTeamCode(team.teamCode);
      if (ids.length > 0) {
        const count = Math.min(this.PROTECTION_LIMIT, ids.length - 1);
        playerIdsToProtect.push(...ids.slice(0, count));
        teamsToMarkFull.push(team.teamCode);
      }
    });

    this.protectionService.setBulkProtection(playerIdsToProtect, teamsToMarkFull);
  }

  startDrafting() {
    const protectedIds = this.protectionService.protectedIds();
    const unprotected = this.playerService.allPlayers()
      .filter(p => !protectedIds.has(p.id));

    this.draftService.initDraft(unprotected);
    this.router.navigate(['selection']);
  }

  isTeamFull(teamCode: string): boolean {
    return this.protectionService.teamFull().has(teamCode);
  }

  protected readonly TeamFormatter = TeamFormatter;
}
