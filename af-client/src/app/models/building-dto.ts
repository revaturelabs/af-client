export class BuildingDto {
    constructor( 
        public id: number, 
        public street_address: string, 
        public totalFloors: number, 
        public numRooms: number 
    ) {}
}