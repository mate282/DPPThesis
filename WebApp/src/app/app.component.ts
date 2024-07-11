import { Component } from '@angular/core';
import { SearchBarComponent } from "./search-bar/search-bar.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone : true,
  imports: [SearchBarComponent]
})
export class AppComponent {


  
}