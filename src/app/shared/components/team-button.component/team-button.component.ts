import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-team-button',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './team-button.component.html',
  styleUrl: './team-button.component.css'
})
export class TeamButtonComponent {
  teamData = input.required<any>();
  teamFull = input<boolean>(false);
}
