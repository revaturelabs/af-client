import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnInit,
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
} from 'date-fns';
import { Subject } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Room } from 'src/app/models/room';
import { Reservation } from 'src/app/models/reservation';
import { MatDialog } from '@angular/material/dialog';
import { EditReservationComponent } from '../edit-reservation/edit-reservation.component';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'selenium-webdriver';

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
    secondary: 'gray'
  }
};

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
    private toastr: ToastrService
  ) {}

  // @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  eventData?: CalendarEvent;

  // modalData!: {
  //   action: string;
  //   event: CalendarEvent;
  // };

  @Input() roomData?: Room;

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
    this.reservationService.getReservationsByRoom(this.roomData!).subscribe(
      (res) => {
        this.events = res.map((r) => {
          let actions = undefined;
          let color = colors.gray;
          if(r.reserver === 'Jimmy'){
            if(r.status === 'canceled'){
              color = colors.red;
            }else{
              color = colors.blue;
              actions = this.actions;
            }
          }

          return {
            start: new Date(r.startTime! * 1000),
            end: new Date(r.endTime! * 1000),
            title: `${r.reservationId}: Reserved by ${r.reserver}`,
            // Only add actions for USER's reservations
            actions: actions,
            color: color,
            id: r.reservationId,
            reserver: r.reserver,
            roomId: r.roomId,
            status: r.status,
          };
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: new Date(199999109),
    //   end: new Date(2000000000),
    //   title: 'This Event ROCKS!',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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
    this.handleEvent('Dropped or resized', event);
  }

  openDialog(action: string, event: CalendarEvent) {
    const dialogRef = this.dialog.open(EditReservationComponent, {
      data: { ...event, action },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.handleEvent(action, result);
        this.refresh.next();
      }
    });
  }

  handleEvent(action: string, event: any): void {
    console.log(event);
    if (action === 'Edit') {
      
      const updatedReservation: Reservation = this.eventToReservation(event);
  
      this.reservationService.updateReservation(updatedReservation, '').subscribe((result)=>{
        this.events = this.events.map((e) => {
          if (e.id === event.id) {
            return event;
          }
          return e;
        });
        console.log(this.events);
      },(error)=>{
        let message = 'Failed to update reservation.';
        let title = '';
        if(error.status === 409){
          title = 'Time conflict';
        }
        this.toastr.error(message, title);
      });
 
    } else if (action === 'Add') {
      // Should get reserver name from current user
      event.reserver = 'TestReserver';
      event.roomId = this.roomData!.roomId;
      this.reservationService.createReservation(this.eventToReservation(event),'').subscribe((result) => {
        console.log(result);
        if(result){
          event.id = result.reservationId
          event.title = `${result.reservationId}: Reserved by ${event.reserver}`
          event.actions = this.actions
          event.color = colors.blue
          event.status = 'reserved'  
          this.events = [...this.events, event]; 
        }
      },(error) =>{
        let message = 'Failed to create reservation.';
        let title = '';
        if(error.status === 409){
          title = 'Time conflict';
        }
        this.toastr.error(message, title);
      });
      
    } else if (action === 'Cancel') {
      this.reservationService.cancelReservation(
        this.eventToReservation(event),
        ''
      ).subscribe((result)=>{
        event.status = 'canceled';
        event.color = colors.red;
        event.actions = undefined;
  
        this.events = this.events.map((e) => {
          if (e.id === event.id) {
            return event;
          }
          return e;
        });
      }, (error)=>{
        let message = 'Failed to cancel reservation.';
        this.toastr.error(message);
      });
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
    this.eventData = { id: 0, start: new Date(), title: ''};
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
}
