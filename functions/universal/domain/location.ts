import { Matches } from 'class-validator/decorator/decorators'

export class Location {
    name: string;
    address: string;
    city?: string;
    state?: string;

    @Matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)
    latitude?: string;

    @Matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)
    longitude?: string;
}