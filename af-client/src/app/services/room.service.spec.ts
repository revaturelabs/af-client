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
});
