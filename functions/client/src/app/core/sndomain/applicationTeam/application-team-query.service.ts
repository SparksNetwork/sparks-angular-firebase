import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class ApplicationTeamQueryService {
    public vals: object[]
    public emitter: EventEmitter<object[]>


}