import {inject, Injectable} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {HttpClient} from '@angular/common/http';
import {Team} from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly http = inject(HttpClient);

  readonly allTeam = toSignal(this.http.get<Team[]>('/api/teams'), { initialValue: [] });
}
