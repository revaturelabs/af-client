export class Room{
    roomId?: number;
    name?: string;
    capacity?: number;
    buildingId?: number;
    type?: RoomType;
}

export enum RoomType {
    ONLINE, 
    CLASSROOM
}