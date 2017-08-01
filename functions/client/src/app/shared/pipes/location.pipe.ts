import { Pipe, PipeTransform } from '@angular/core';
import { ILocation } from "../../../../../../shared/interfaces/location";

@Pipe({ name: 'location' })
export class LocationPipe implements PipeTransform {
    transform(location: ILocation, forDirections: boolean = false): string {
        if (!location) {
            return ''
        };

        return forDirections ? this.getLocationForDirections(location) : this.getLocationString(location);
    }

    private getLocationString(location: ILocation): string {
        if (!location) {
            return ''
        };

        let locStr = '';
        if (location.address) {
            locStr += location.address
        };
        if (location.city) {
            locStr += locStr ? `, ${location.city}` : location.city
        };
        if (location.state) {
            locStr += locStr ? `, ${location.state}` : location.state;
        }
        return locStr;
    }

    private getLocationForDirections(location: ILocation): string {
        if (!location) {
            return ''
        };
        if (!location.latitude || !location.longitude) {
            return this.getLocationString(location);
        }
        return `${location.latitude},${location.longitude}`
    }
}
