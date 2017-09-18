function getLocationString(latitude: string, longitude: string,
    locationName: string, locationAddress: string,
    locationCity: string, locationState: string): string {
    if (!location) {
        return ''
    };

    let locStr = '';
    if (locationName) {
        locStr += locationName
    };
    if (locationAddress) {
        locStr += locStr ? `, ${locationAddress}` : locationAddress;
    };
    if (locationCity) {
        locStr += locStr ? `, ${locationCity}` : locationCity
    };
    if (locationState) {
        locStr += locStr ? `, ${locationState}` : locationState;
    }
    return locStr;
}

export function getLocationForDirections(latitude: string, longitude: string,
    locationName: string, locationAddress: string,
    locationCity: string, locationState: string): string {
    if (!latitude || !longitude) {
        return getLocationString(latitude, longitude, locationName, locationAddress, locationCity, locationState);
    }
    return `${latitude},${longitude}`
}