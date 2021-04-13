export class Room{
    roomId?: number;
    name?: string;
    capacity?: number;
    buildingId?: number;
    type?: string;
}

export enum RoomType {
    VIRTUAL, REMOTE, MEETING
}