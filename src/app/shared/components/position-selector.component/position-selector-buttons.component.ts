import {Component, input, model} from '@angular/core';

@Component({
  selector: 'app-position-selector-buttons',
  imports: [],
  templateUrl: './position-selector-buttons.component.html',
  styleUrl: './position-selector-buttons.component.css',
})
export class PositionSelectorButtonsComponent {
  positions = input.required<string[]>()
  colorButton = input.required<string>();

  currentFilter = model<string>();


}
