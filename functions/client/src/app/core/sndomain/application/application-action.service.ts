
import { Injectable } from "@angular/core";

import { BaseActionService } from "../../../../../../lib/firebase-universal/client";
import { Http } from "@angular/http";
import { environment } from "../../../../environments/environment";
import { ApplicationQueryService } from "./application-query.service";

@Injectable()
export class ApplicationActionService extends BaseActionService {
  constructor(
    public query: ApplicationQueryService,
    public http: Http
  ) {
    super(environment.apiRoot, query.paths.api, http)
  }
}