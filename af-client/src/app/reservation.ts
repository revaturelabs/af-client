export interface Reservation {
    id: number;
    //if batchId is blank it is not used, possible to be null?
    batchId: number;
    buildingId: number;
    locationId: number;
    roomId: number;
    //this is an enum in java, leave as a string here?
    roomType: String;
    reserver: String;
    startDate:String;
    endDate: String;
}