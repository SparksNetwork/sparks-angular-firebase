import { Injectable } from '@angular/core';

class BasePaths {
  firebase: string
  api: string
}

@Injectable()
export class ProjectPaths extends BasePaths {
  firebase = '/project'
  api = '/project'
}
