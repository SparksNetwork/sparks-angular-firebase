
import { Injectable } from '@angular/core';
import { ApplicationQueryService } from './application-query.service';
import { BaseActionService } from '../../../../../../lib/firebase-universal/client';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { ApplicationStatus, Application, ApplicationStepFinished } from '../../../../../../universal/domain/application';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApplicationActionService extends BaseActionService {
  constructor(
    public query: ApplicationQueryService,
    public http: Http
  ) {
    super(environment.apiRoot, query.paths.api, http)
  }

  public changeStatus(key: string, status: ApplicationStatus) {
    let _status = {};
    const timestamp = new Date().toISOString();

    switch (status) {
      case ApplicationStatus.Pending:
        _status = {
          status: status,
          submittedOn: timestamp
        }
        break;
      case ApplicationStatus.Accepted:
        _status = {
          status: status,
          acceptedOn: timestamp
        }
        break;
      case ApplicationStatus.Canceled:
        _status = {
          status: status,
          canceledOn: timestamp
        }
        break;
      default:
        _status = {
          status: status
        }
    }

    return this.update(key, _status);
  }

  public createApplication(projectKey: string, profileKey: string, oppKey: string) {
    const key = this.query.generateProjectProfileKey(projectKey, profileKey);

    const application = new Application();
    application.profileKey = profileKey
    application.oppKey = oppKey;
    application.status = ApplicationStatus.Incomplete;
    application.projectKey = projectKey;
    application.createdOn = new Date().toISOString();

    return this.replace(key, application);
  }

  public saveOppAnswer(application, oppQuestion, oppAnswer) {
    if (!application) {
      return Observable.of(null);
    }
    application.oppQuestion = oppQuestion;
    application.oppAnswer = oppAnswer;
    application.step = ApplicationStepFinished.Answer;

    const applicationCopy = Object.assign({}, application)
    return this.replace(application.$key, this.formatToDb(applicationCopy));
  }

}
