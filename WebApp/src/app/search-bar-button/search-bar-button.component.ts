import { Component,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-bar-button',
  standalone: true,
  imports: [],
  templateUrl: './search-bar-button.component.html',
  styleUrl: './search-bar-button.component.scss'
})
export class SearchBarButtonComponent {
  @Output() buttonClicked = new EventEmitter<void>();

  search(){
    this.buttonClicked.emit();
  }
}
