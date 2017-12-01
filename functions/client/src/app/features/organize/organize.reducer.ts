import { ProjectActions } from '../../core/sndomain/project'

export const INITIAL = {
  working: false,
}

export function reducer(state = INITIAL, action) {
  switch (action.type) {
    case ProjectActions.CREATE: {
      return {
        ...state,
        working: true,
      }
    }
    case ProjectActions.CREATE_SUCCESS: {
      return {
        ...state,
        working: false,
      }
    }
    default: {
      return state
    }
  }
}
