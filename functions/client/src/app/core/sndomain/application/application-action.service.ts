
import { Injectable } from "@angular/core";

import { ApplicationQueryService } from "./index";
import { BaseActionService } from "../../../../../../lib/firebase-universal/client";
import { Http } from "@angular/http";
import { environment } from "../../../../environments/environment";
import { ApplicationStatus } from "../../../../../../universal/domain/application";

@Injectable()
export class ApplicationActionService extends BaseActionService {
  constructor(
    public query: ApplicationQueryService,
    public http: Http
  ) {
    super(environment.apiRoot, query.paths.api, http)
  }

  public changeStatus(key: string, status: ApplicationStatus) {
    let _status = {
      status: status
    }
    return this.update(key, _status);
  }

}