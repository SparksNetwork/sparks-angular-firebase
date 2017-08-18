
import { Injectable } from "@angular/core";
import { ApplicationTeamQueryService } from "./index";
import { BaseActionService } from "../../../../../../lib/firebase-universal/client";
import { Http } from "@angular/http";
import { environment } from "../../../../environments/environment";

@Injectable()
export class ApplicationTeamActionService extends BaseActionService {
  constructor(
    public query: ApplicationTeamQueryService,
    public http: Http
  ) {
    super(environment.apiRoot, query.paths.api, http)
  }
}