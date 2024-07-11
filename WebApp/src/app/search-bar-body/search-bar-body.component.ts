import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar-body',
  standalone: true,
  imports: [],
  templateUrl: './search-bar-body.component.html',
  styleUrl: './search-bar-body.component.scss'
})
export class SearchBarBodyComponent {
  @Output() textChanged = new EventEmitter<string>();
  onInputChange(value: string) {
    this.textChanged.emit(value);
  }
}
