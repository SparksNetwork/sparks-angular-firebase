import { Matches } from 'class-validator/decorator/decorators'
import { IsNumber } from "class-validator";

export class Location {
    name: string;
    address: string;
    city?: string;
    state?: string;

    // TODO check why validation against a pattern doesn't work as expected

    //@Matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/)
    @IsNumber()
    latitude?: string;

    //@Matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/)
    @IsNumber()
    longitude?: string;
}