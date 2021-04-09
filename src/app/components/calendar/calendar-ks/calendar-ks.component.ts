import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMinutes,
  endOfWeek,
} from 'date-fns';
import { Subject, fromEvent } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { WeekViewHourSegment } from 'calendar-utils';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Room } from 'src/app/models/room';
import { Reservation } from 'src/app/models/reservation';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditReservationComponent } from '../edit-reservation/edit-reservation.component';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
import { ToastrService } from 'ngx-toastr';
import { finalize, takeUntil } from 'rxjs/operators';
import { DisplayReservationComponent } from '../display-reservation/display-reservation.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  gray: {
    primary: 'gray',
    secondary: 'lightgray',
  },
};

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Component({
  selector: 'app-calendar-ks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-ks.component.html',
  styleUrls: ['./calendar-ks.component.sass'],
})
export class CalendarKsComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private reservationService: ReservationService,
    private confirmService: AppConfirmService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  eventData?: CalendarEvent;

  showCanceled: boolean = true;

  @Input() roomData?: Room;

  loading: boolean = false;

  ngOnInit(): void {
    this.populateEvents();
    this.refresh.next();
  }

  actions: CalendarEventAction[] | any[] = [
    {
      label: this.sanitizer.bypassSecurityTrustHtml(
        `<mat-icon class="material-icons"
           style="font-size: 1.4em; text-align: center; vertical-align: middle; line-height: 1em;
                  padding-bottom: 3px; padding-left: 2px;">
             edit
         </mat-icon>`
      ),
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.openDialog('Edit', event);
      },
    },
    {
      label: this.sanitizer.bypassSecurityTrustHtml(
        `<mat-icon class="material-icons"
           style="font-size: 1.4em; text-align: center; vertical-align: middle; line-height: 1em;
                  padding-bottom: 3px;">
             delete
         </mat-icon>`
      ),
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.confirmDelete(event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  confirmDelete(event: any) {
    const msg: string = `Are you sure you want to cancel event with id ${event.reservationId}?`;
    this.confirmService
      .confirm({ title: 'Confirm Cancel', message: msg })
      .subscribe((confirm) => {
        if (confirm) {
          this.handleEvent('Cancel', event);
          this.refresh.next();
        }
      });
  }

  // Populates Events on calendar based on what room you selected
  populateEvents() {
    this.loading = true;
    this.reservationService
      .getReservationsByRoom(this.roomData!)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(
        (res) => {
          this.events = res.map((r) => {
            let actions = undefined;
            let color = colors.gray;
            let draggable = false;
            let resizable = false;
            if (r.reserver === 'Jimmy') {
              if (r.status === 'canceled') {
                color = colors.red;
              } else {
                color = colors.blue;
                actions = this.actions;
                draggable = true;
                resizable = true;
              }
            }

            let start = new Date(r.startTime! * 1000);
            let end = new Date(r.endTime! * 1000);
            let event = {
              start,
              end,
              title: `${r.reservationId}: Reserved by ${
                r.reserver
              }: ${start.toLocaleString()} - ${end.toLocaleString()}`,
              actions,
              resizable: {
                beforeStart: resizable,
                afterEnd: resizable,
              },
              draggable,
              color,
              id: r.reservationId,
              reserver: r.reserver,
              roomId: r.roomId,
              status: r.status,
            };
            if (event.status === 'canceled') {
              if (!this.canceledEvents.find((e) => e.id === event.id)) {
                this.canceledEvents = [...this.canceledEvents, event];
              }
            }
            return event;
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  events: CalendarEvent[] = [];
  canceledEvents: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('dayClicked', date, events);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }

    if (events.length > 0) {
      return;
    }

    date.setHours(8);
    this.eventData = { id: 0, start: date, title: 'Clicked on date' };
    this.openDialog('Add', this.eventData);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });

    const oldStart = event.start;
    const oldEnd = event.end;

    event.start = newStart;
    event.end = newEnd;

    // this.handleEvent('Dropped or resized', event);
    this.openDialog('Edit', event, {
      cancelCB: () => {
        console.log('User canceled');
        this.events = this.events.map((e) => {
          if (e.id === event.id) {
            console.log('setting things back');
            return {
              ...event,
              start: oldStart,
              end: oldEnd,
            };
          }
          return e;
        });
        this.refresh.next();
      },
    });
  }

  openDialog(
    action: string,
    event: CalendarEvent,
    callbacks?: { cancelCB?: any; cb?: any }
  ): void {
    let dialogRef:MatDialogRef<any>;
    if(action !== 'Clicked'){
      dialogRef = this.dialog.open(EditReservationComponent, {
        data: { ...event, action },
      });
    }else{
      dialogRef = this.dialog.open(DisplayReservationComponent, {
        data: {...event, action}
      })
    }
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.handleEvent(action, result, callbacks);
        this.refresh.next();
      } else {
        callbacks?.cancelCB && callbacks.cancelCB();
      }
    });
  }

  handleEvent(action: string, event: any, cb?: any): void {
    console.log('handleEvent', action, event);
    if (action === 'Edit') {
      // Check for time conflict.
      if (this.hasTimeConflict(event)) {
        this.toastr.error('Failed to update reservation', 'Time conflict');
        cb?.cancelCB && cb?.cancelCB();
        this.cdr.detectChanges();
        return;
      }
      const updatedReservation: Reservation = this.eventToReservation(event);
      this.loading = true;
      this.reservationService
        .updateReservation(updatedReservation, '')
        .pipe(
          finalize(() => {
            this.loading = false;
            cb?.cb && cb?.cb();
            this.cdr.detectChanges();
          })
        )
        .subscribe(
          (result) => {
            const { reserver, start, end } = event;
            event.title = `${
              result.reservationId
            }: Reserved by ${reserver}: ${start.toLocaleString()} - ${end.toLocaleString()}`;
            this.events = this.events.map((e) => {
              if (e.id === event.id) {
                return event;
              }
              return e;
            });
            this.toastr.success('Reservation updated');
          },
          (error) => {
            let message = 'Failed to update reservation.';
            let title = '';
            if (error.status === 409) {
              title = 'Time conflict';
            }
            this.toastr.error(message, title);
          }
        );
    } else if (action === 'Add') {
      // Check for time conflict.
      if (this.hasTimeConflict(event)) {
        this.toastr.error('Failed to add reservation', 'Time conflict');
        cb?.cancelCB && cb?.cancelCB();
        this.cdr.detectChanges();
        return;
      }
      // Should get reserver name from current user
      event.reserver = 'TestReserver';
      event.roomId = this.roomData!.roomId;
      this.loading = true;
      this.reservationService
        .createReservation(this.eventToReservation(event), '')
        .pipe(
          finalize(() => {
            this.loading = false;
            cb?.cb && cb?.cb();
            this.cdr.detectChanges();
          })
        )
        .subscribe(
          (result) => {
            if (result) {
              const { reserver, start, end } = event;
              event.id = result.reservationId;
              event.title = `${
                result.reservationId
              }: Reserved by ${reserver}: ${start.toLocaleString()} - ${end.toLocaleString()}`;
              event.actions = this.actions;
              event.color = colors.blue;
              event.status = 'reserved';
              event.draggable = true;
              event.resizable = { beforeStart: true, afterEnd: true };
              this.events = [...this.events, event];
            }
            this.toastr.success('Reservation added');
          },
          (error) => {
            let message = 'Failed to create reservation.';
            let title = '';
            if (error.status === 409) {
              title = 'Time conflict';
            }
            this.toastr.error(message, title);
          }
        );
    } else if (action === 'Cancel') {
      this.loading = true;
      this.reservationService
        .cancelReservation(this.eventToReservation(event), '')
        .pipe(
          finalize(() => {
            this.loading = false;
            cb?.cb && cb?.cb();
            this.cdr.detectChanges();
          })
        )
        .subscribe(
          (result) => {
            event.status = 'canceled';
            event.color = colors.red;
            event.actions = undefined;
            event.draggable = false;
            (event.resizable = { beforeStart: false, afterEnd: false }),
              (this.events = this.events.map((e) => {
                if (e.id === event.id) {
                  return event;
                }
                return e;
              }));
            this.canceledEvents = [...this.canceledEvents, event];
            this.filterCanceled();
            this.toastr.warning('Reservation canceled');
          },
          (error) => {
            let message = 'Failed to cancel reservation.';
            this.toastr.error(message);
          }
        );
    } 
  }

  eventToReservation(event: any): any {
    return {
      reservationId: Number(event.id),
      reserver: event.reserver,
      startTime: event.start.getTime() / 1000,
      endTime: event.end.getTime() / 1000,
      roomId: event.roomId,
      status: event.status,
    };
  }

  addEvent(): void {
    this.eventData = { id: 0, start: new Date(), title: '' };
    this.openDialog('Add', this.eventData);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  toggleCanceled(): void {
    this.showCanceled = !this.showCanceled;
    this.filterCanceled();
  }

  filterCanceled(): void {
    if (!this.showCanceled) {
      this.events = this.events.filter((e: any) => {
        return e.status !== 'canceled';
      });
    } else {
      this.canceledEvents.forEach((canceledEvent) => {
        if (!this.events.find((e) => e.id === canceledEvent.id)) {
          this.events = [...this.events, canceledEvent];
        }
      });
    }
    this.refresh.next();
  }

  // Best effort check for time overlap.
  // Otherwise depend on backend to return 409 status.
  hasTimeConflict(event: CalendarEvent): boolean {
    return (
      this.events.find((e: any) => {
        return (
          e.id !== event.id &&
          e.status !== 'canceled' &&
          ((event.start >= e.start && event.start <= e.end) || // new event starts in existing
            (event.end! >= e.start && event.end! <= e.end) || // new event ends in existing
            (e.start > event.start && e.end < event.end!)) // existing within new
        );
      }) !== undefined
    );
  }

  dragToCreateActive = false;
  weekStartsOn: 0 = 0;

  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: 0,
      title: 'New event',
      start: segment.date,
      meta: {
        tmpEvent: true,
      },
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          // Create the event data to save.
          const eventData: CalendarEvent = {
            id: 0,
            start: dragToSelectEvent.start,
            end: dragToSelectEvent.end,
            title: 'Drag on date',
          };
          // Callback to run after the openDialog completes.
          // We want to remove the placeholder dragged event in every case.
          const cb = () => {
            this.events = this.events.filter(
              (e) => e.id !== dragToSelectEvent.id
            );
            this.refresh.next();
          };
          // Open the confirm dialog modal.
          this.openDialog('Add', eventData, { cancelCB: cb, cb });

          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh.next();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent | any) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh.next();
      });
  }
}
