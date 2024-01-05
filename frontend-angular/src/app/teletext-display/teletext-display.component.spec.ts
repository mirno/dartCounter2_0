import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeletextDisplayComponent } from './teletext-display.component';

describe('TeletextDisplayComponent', () => {
  let component: TeletextDisplayComponent;
  let fixture: ComponentFixture<TeletextDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeletextDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeletextDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
