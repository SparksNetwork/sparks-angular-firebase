import { Injectable } from '@angular/core';

@Injectable()
export class OppTeamsSelectService {
    private _selectedTeamKeys: Array<string> = new Array<string>();

    constructor() { }

    public addTeamKey(key: string) {
        if (this._selectedTeamKeys.indexOf(key) === -1) {
            this._selectedTeamKeys.push(key);
        }
    }

    public getTeamKeys() {
        return this._selectedTeamKeys;
    }

    public removeAllTeamKeys() {
        this._selectedTeamKeys = new Array<string>();
    }

    public removeTeamByKey(key: string) {
        let index = this._selectedTeamKeys.indexOf(key);
        if (index !== -1)
            this._selectedTeamKeys.splice(index, 1);
    }

}