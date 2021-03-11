export class Reservation {
  reservationId: number;
  batchId?: number;
  buildingId: number;
  locationId: number;
  roomId: number;
  roomType: string;
  reserver: string;
  startDate: string;
  endDate: string;

  constructor(
    reservationId: number,
    buildingId: number,
    locationId: number,
    roomId: number,
    roomType: string,
    reserver: string,
    startDate: string,
    endDate: string,
    batchId?: number
    ) {

    this.reservationId = reservationId;
    this.batchId = batchId;
    this.buildingId = buildingId;
    this.locationId = locationId;
    this.roomId = roomId;
    this.roomType = roomType;
    this.reserver = reserver;
    this.startDate = startDate;
    this.endDate = endDate;
  }
  
}
