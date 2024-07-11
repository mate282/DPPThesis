import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarTypeComponent } from './search-bar-type.component';

describe('SearchBarTypeComponent', () => {
  let component: SearchBarTypeComponent;
  let fixture: ComponentFixture<SearchBarTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBarTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
