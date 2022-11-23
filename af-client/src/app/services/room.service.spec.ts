import { TestBed } from '@angular/core/testing';

import { RoomService } from './room.service';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all rooms', () => {
    const roomsObservable = service.getAllRooms();
    let response;

    roomsObservable.subscribe((res) => {
      response = res;
    });

    expect(response).toBeInstanceOf(Array);
  });

  it('should provide a list of all remote training rooms', () => {
    const trainingRoomsObservable = service.getAllRemoteTrainingRooms();
    let response;

    trainingRoomsObservable.subscribe((res) => {
      response = res;
    });
    expect(response).toBeInstanceOf(Array);
  });

  it('should provide a list of all remote meeting rooms', () => {
    const meetingRoomsObservable = service.getAllRemoteMeetingRooms();
    let response;

    meetingRoomsObservable.subscribe((res) => {
      response = res;
    });
    expect(response).toBeInstanceOf(Array);
  });

  it('should provide a list of all physical meeting rooms', () => {
    const physicalMeetingRoomsObservable = service.getAllPhysicalMeetingRooms();
    let response;

    physicalMeetingRoomsObservable.subscribe((res) => {
      response = res;
    });
  });

  it('should provide a list of all physical training rooms', () => {
    const physicalTrainingRoomsObservable = service.getAllPhysicalTrainingRooms();
    let response;
    physicalTrainingRoomsObservable.subscribe((res) => {
      response = res;
    });
  });
});
