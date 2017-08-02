import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/delay'
import { Observable } from 'rxjs'

import { ProjectQueryService } from '../../../core/sndomain/project'
import { OppQueryService } from '../../../core/sndomain/opp'

@Injectable()
export class ProjectSources implements Resolve<any> {

  constructor(
    public projectQuery: ProjectQueryService,
    public oppQuery: OppQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projectKey = route.paramMap.get('key')
    const project = this.projectQuery.one(projectKey)
    // for fucks sake, bug in angularfire, breaks if query is passed to af.list
    // const opps = this.oppQuery.af.list(this.oppQuery.collection.byProjectKey(projectKey))
    // const opps = this.oppQuery.af.list(this.oppQuery.collection.by('projectKey', projectKey))
    const opps = this.oppQuery.af.list(this.oppQuery.collection.ref, {
      query: {
        orderByChild: 'projectKey',
        equalTo: projectKey,
      }
    })

    const sources = {
      project,
      opps,
    }
    
    return Observable.combineLatest(
      project,
      opps,
    )
      .map(() => sources)
      .first()
  }
}