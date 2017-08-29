import { Injectable } from '@angular/core';

@Injectable()
export class DateHelperService {
    constructor() { }

    public getUtcInIsoFormat(): string{
        var now = new Date(); 
        var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        return now_utc.toISOString();
    }
}