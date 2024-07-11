import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar-type',
  standalone: true,
  imports: [],
  templateUrl: './search-bar-type.component.html',
  styleUrl: './search-bar-type.component.scss'
})
export class SearchBarTypeComponent {
  @Output() typeChanged = new EventEmitter<string>();

  onInputChange(value:string) {
    this.typeChanged.emit(value);
  }
}
