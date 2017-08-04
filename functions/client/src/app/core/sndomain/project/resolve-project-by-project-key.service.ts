import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/first'
import { transformAndValidate } from 'class-transformer-validator';

import { ProjectQueryService } from './project-query.service'
import { Project } from "../../../../../../shared/models/project.model";

@Injectable()
export class ResolveProjectByProjectKey implements Resolve<Promise<Project>> {

  constructor(
    public projectQuery: ProjectQueryService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projectKey = route.paramMap.get('projectKey')
    const project = this.projectQuery.one(projectKey)

    const validateOpt = {validator: {skipMissingProperties: true}};

    return project
      .map((p) => transformAndValidate(Project, p, validateOpt).then((p: Project) => {
          return p;
        })  
        .catch(error => {
          // TODO handle error on transformation (invalid JSON) or validation error
          console.log(error);
        })
      )
      .first()
  }
}