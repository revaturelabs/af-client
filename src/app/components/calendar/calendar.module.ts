import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';

import { FlatpickrModule } from 'angularx-flatpickr';
import {
  CalendarModule as AngularCalendarModule,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CalendarKsComponent } from './calendar-ks/calendar-ks.component';
import { CalendarDceComponent } from './calendar-dce/calendar-dce.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';

const components = [CalendarKsComponent, CalendarDceComponent, EditReservationComponent];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModalModule,
    FlatpickrModule.forRoot({
      enable: [
        {
          from: new Date(0),
          to: new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
        },
      ],
    }),
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [components],
})
export class CalendarModule {}
