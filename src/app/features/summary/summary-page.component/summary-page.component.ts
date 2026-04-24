import {Component, inject} from '@angular/core';
import {TeamSummaryComponent} from '../team-summary.component/team-summary.component';
import {DraftSelectionService} from '@core/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-summary-page',
  imports: [
    TeamSummaryComponent
  ],
  templateUrl: './summary-page.component.html',
  styleUrl: './summary-page.component.css',
})
export class SummaryPage {
  readonly draftSelectionService = inject(DraftSelectionService)
  private readonly router = inject(Router)

  restart(){
    this.router.navigate(['home']);
  }

  goBack(){
    this.router.navigate(['selection'])
  }

}
