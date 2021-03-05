import { BuildingDto } from "./building-dto";

export class LocationDto {
    constructor( public locationId: number, state: string, city: string, zipCode: string, buildings: BuildingDto ) {}
}