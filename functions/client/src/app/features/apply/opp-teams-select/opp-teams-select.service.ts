import { Injectable } from '@angular/core';

@Injectable()
export class OppTeamsSelectService {
    private _selectedTeamKeys: Array<string> = new Array<string>();

    constructor() { }

    public addTeam(key: string){
        if(this._selectedTeamKeys.indexOf(key)  === -1){
            this._selectedTeamKeys.push(key);
        }
    }

    public getTeams(){
        return this._selectedTeamKeys;
    }

}