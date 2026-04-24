import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Player} from '@core/models';
import {toSignal} from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly http = inject(HttpClient);
  readonly allPlayers = toSignal(this.getAllPlayers(),{
    initialValue: []
  })

  getPlayersByTeamCode(teamCode: string){
    return this.allPlayers().filter(p => p.teamId === teamCode);
  }

  getPlayersIdByTeamCode(teamCode: string): number[]{
    return this.getPlayersByTeamCode(teamCode).map(p => p.id);
  }

  private getAllPlayers(): Observable<Player[]>{
    return this.http.get<Player[]>(`${environment.apiUrl}/players`);  }

}
