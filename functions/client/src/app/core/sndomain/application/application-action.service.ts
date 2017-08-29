
import { Injectable } from "@angular/core";
import { ApplicationQueryService } from "./application-query.service";
import { BaseActionService } from "../../../../../../lib/firebase-universal/client";
import { Http } from "@angular/http";
import { environment } from "../../../../environments/environment";
import { ApplicationStatus } from "../../../../../../universal/domain/application";
import { DateHelperService } from "../../date-helper.service";

@Injectable()
export class ApplicationActionService extends BaseActionService {
  constructor(
    public query: ApplicationQueryService,
    public http: Http,
    public dateHelper: DateHelperService
  ) {
    super(environment.apiRoot, query.paths.api, http)
  }

  public changeStatus(key: string, status: ApplicationStatus) {
    let _status = {};
    if (status === ApplicationStatus.Canceled) {
      _status = {
        status: status,
        canceledOn: this.dateHelper.getUtcInIsoFormat()
      }
    }
    else
      _status = {
        status: status
      }
    return this.update(key, _status);
  }

}