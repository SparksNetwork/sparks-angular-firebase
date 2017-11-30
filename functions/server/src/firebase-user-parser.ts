import { Request, Response, NextFunction } from 'express'
import { admin } from './firebase-functions-env'

export function firebaseUserParser(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = <string | null>req.headers['authorization']
  if (!authorizationHeader) {
    console.error('requires Authorization header')
    res.status(403).send('Unauthorized')
    return
  }
  console.log('authorizationHeader', typeof authorizationHeader, authorizationHeader)
  const idToken = authorizationHeader.split('Bearer ')[1]
  console.log('found token', idToken)
  admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      console.log('found user', decodedToken.uid)
      req['uid'] = decodedToken.uid
      next()
    })
    .catch(error => {
      console.log('unable to decode user token', error)
      res.status(403).send('Unauthorized')
    })
}
