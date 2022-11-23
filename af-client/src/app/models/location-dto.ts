export class LocationDto {
    id: number;
    city: string;
    state: string;
    zipCode: string;
    numBuildings: number;
    constructor( 
        id: number, 
        city: string, 
        state: string, 
        zipCode: string, 
        numBuildings: number 
    ) {}
}