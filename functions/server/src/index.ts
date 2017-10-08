import { initialize } from './firebase-functions-env'
initialize()
// export * from './client'
console.log('INDEX: importing api')
export * from './api'
console.log('INDEX: importing triggers')
export * from './triggers'
