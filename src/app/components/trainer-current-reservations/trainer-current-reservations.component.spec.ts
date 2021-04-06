import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCurrentReservationsComponent } from './trainer-current-reservations.component';

describe('TrainerCurrentReservationsComponent', () => {
  let component: TrainerCurrentReservationsComponent;
  let fixture: ComponentFixture<TrainerCurrentReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerCurrentReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerCurrentReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
