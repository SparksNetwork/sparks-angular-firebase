const projectReducer = 

const rootReducer = combineReducersEnhanced({
  ui: state => state,
  domain: {
    project: projectReducer,
  }
})


export type Key = string

export class Project {

}

const PROJECT_FETCH_RECRUITING = ''
const ProjectActions  = {
  FetchRecruiting: class {
    static type = PROJECT_FETCH_RECRUITING
  }
}

@Injectable()
export class ProjectService {
  constructor(
    public db: AngularFireDatabase,
    public store: Store,
  ) {}

  one(key: string) {
    return this.db.object(`/project/${key}`)
  }

  by(field: string, value: string) {
    return this.db.list(``)
  }

  public recruiting() {
    return this.store.select('project.lists.recruiting')
      .do(projects => {
        if (!(projects.isLoading || projects.isLoaded)) {
          this.store.dispatch(new ProjectActions.FetchRecruiting())
        }
      })
  }
}

// state

export interface ProjectState {
  lists: {
    recruiting: {
      isLoading?: boolean,
      isLoaded?: boolean,
      keys?: Key[],
    },
  },
  items: {
    Key: {
      isLoading?: boolean,
      isLoaded?: boolean,
      values?: Project,
    }
  }
}

export interface State {
  project: ProjectState,
}

// reducer

export function projectReducer(state: ProjectState, action: ProjectActions.Actions): ProjectState {
  switch(action.type) {
    case ProjectActions.FetchRecruiting.type: {
      return {...state, lists: { recruiting: { isLoading: true }}}
    }
    case ProjectActions.FETCHED_PROJECTS_RECRUITING: {
      return {
        ...state,
        lists: {
          recruiting: pluckKeysFromList(state.lists.recruiting, action.payload),
        },
        items: updateItemsFromList(state.items, action.payload)
      }
    }
  }
}

// effect
@Effect() FetchProjectsRecruitingEffect$: Observable<Action> =
  this.actions$.ofType(ProjectActions.FetchProjectsRecruiting.type)
    .switchMap(() => this.projectService.recruiting())
    .map(rows => new ProjectActions.FetchedProjectsRecruiting(rows))

