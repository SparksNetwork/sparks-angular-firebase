
import { Injectable } from "@angular/core";
import { ApplicationTeamQueryService } from "./index";

@Injectable()
export class ApplicationTeamActionService {
    constructor(
      public query: ApplicationTeamQueryService
    ){}
/*   
    add(foo) { this.query.emitter.emit([foo, ...this.query.vals]) }
  
    remove(key) { this.query.emitter.emit(this.query.vals.filter(f => f.key !== key))} */
  }