import { Component } from '@angular/core';
import { SearchBarButtonComponent } from "../search-bar-button/search-bar-button.component";
import { SearchBarBodyComponent } from "../search-bar-body/search-bar-body.component";
import { SearchBarTypeComponent } from "../search-bar-type/search-bar-type.component";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SearchBarButtonComponent, SearchBarBodyComponent, SearchBarTypeComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  identifierType: string = 'SN';
  identifier: string = '';
  search() {
    console.log(`Searching for ${this.identifierType}:${this.identifier}`);
    // Implement the search logic here
  }

  setId(value: string){
    this.identifier = value;
  }

  setType(value: string){
    this.identifierType = value;
  }
}
