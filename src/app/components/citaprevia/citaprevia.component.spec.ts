import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitapreviaComponent } from './citaprevia.component';

describe('CitapreviaComponent', () => {
  let component: CitapreviaComponent;
  let fixture: ComponentFixture<CitapreviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitapreviaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitapreviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
