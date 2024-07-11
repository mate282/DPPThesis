import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarButtonComponent } from './search-bar-button.component';

describe('SearchBarButtonComponent', () => {
  let component: SearchBarButtonComponent;
  let fixture: ComponentFixture<SearchBarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
