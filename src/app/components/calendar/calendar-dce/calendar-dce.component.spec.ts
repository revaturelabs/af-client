import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDceComponent } from './calendar-dce.component';

describe('CalendarDceComponent', () => {
  let component: CalendarDceComponent;
  let fixture: ComponentFixture<CalendarDceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
