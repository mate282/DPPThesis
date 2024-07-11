import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarBodyComponent } from './search-bar-body.component';

describe('SearchBarBodyComponent', () => {
  let component: SearchBarBodyComponent;
  let fixture: ComponentFixture<SearchBarBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBarBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
