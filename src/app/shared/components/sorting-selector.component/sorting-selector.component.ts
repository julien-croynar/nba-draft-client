import {Component, input, model} from '@angular/core';
import {SortingModel} from '@core/models';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-sorting-selector',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sorting-selector.component.html',
  styleUrl: './sorting-selector.component.css',
})
export class SortingSelectorComponent {
  sortingInputs = input.required<SortingModel[]>();
  currentFilter = model.required<string>();
}
