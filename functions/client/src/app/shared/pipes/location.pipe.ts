import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../../../../../universal/domain/location';

@Pipe({ name: 'snLocation' })
export class LocationPipe implements PipeTransform {
    transform(location: Location, param: string = null): string {
        if (!location) {
            return ''
        };

        let formatForDirections = false;
        let useShortFormat = false;
        let formatAddressOnly = false;

        if (param) {
            formatForDirections = (param === 'directions');
            useShortFormat = (param === 'short');
            formatAddressOnly = (param === 'address');
        }

        return formatForDirections ? this.getLocationForDirections(location) : this.getLocationString(location, useShortFormat, formatAddressOnly);
    }

    private getLocationString(location: Location, useShortFormat: boolean = false, formatAddressOnly: boolean = false): string {
        if (!location) {
            return ''
        };

        let locStr = '';
        if (!useShortFormat && location.name) {
            locStr += location.name
        };
        if (!useShortFormat && location.address) {
            locStr += locStr ? `, ${location.address}` : location.address;
        };
        if (!formatAddressOnly && location.city) {
            locStr += locStr ? `, ${location.city}` : location.city
        };
        if (!formatAddressOnly && location.state) {
            locStr += locStr ? `, ${location.state}` : location.state;
        }
        return locStr;
    }

    private getLocationForDirections(location: Location): string {
        if (!location) {
            return ''
        };
        if (!location.latitude || !location.longitude) {
            return this.getLocationString(location);
        }
        return `${location.latitude},${location.longitude}`
    }
}
