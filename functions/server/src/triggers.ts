import 'reflect-metadata';
import { functions, admin } from './firebase-functions-env'
import * as firebase from 'firebase'
// import * as admin from 'firebase-admin'

const getKeys = (snap: firebase.database.DataSnapshot) => Object.keys(snap.val())

function denormalizerFromParentChange(childCollection, foreignKey, denormalizedField) {
  return function(evt) {
    console.log('denormalizeFromParentChange', childCollection, foreignKey, denormalizedField)
    const newData = evt.data.val()
    const parentKey = evt.params.key
    const updateDenormalizedField = key =>
      childCollection.one(key).child(denormalizedField).set(newData)

    return (childCollection.by(foreignKey, parentKey) as firebase.database.Query)
      .once('value')
      .then(getKeys)
      .then(keys => Promise.all(keys.map(updateDenormalizedField)))
  }
}

function denormalizerFromForeignKeyChange(parentCollection, childCollection, denormalizedField) {
  return function(evt) {
    const parentKey = evt.data.val()
    const childKey = evt.params.key
    return parentCollection.one(parentKey)
      .once('value')
      .then(snap => snap.val())
      .then(val => childCollection.one(childKey).child(denormalizedField).set(val))
  }
}

function denormalizers(parentCollection, childCollection, foreignKey, denormalizedField) {
  return {
    onParentChange: denormalizerFromParentChange(
      childCollection,
      foreignKey,
      denormalizedField
    ),
    onChildForeignKeyChange: denormalizerFromForeignKeyChange(
      parentCollection,
      childCollection,
      denormalizedField
    )
  }
}

import { TeamCollection } from '../../universal/domain/team'
import { OppAllowedTeamCollection } from '../../universal/domain/oppAllowedTeam'

const teams = new TeamCollection(admin.database())
const oppAllowedTeams = new OppAllowedTeamCollection(admin.database())

const teamToOATDenormalizers = denormalizers(
  teams,
  oppAllowedTeams,
  'teamKey',
  'team'
)

console.log('TRIGGERS: exporting')
export const teamToOATTeamOnWrite =
  functions.database.ref('/team/{key}')
    .onWrite(teamToOATDenormalizers.onParentChange)

export const teamToOATOATOnUpdate =
  functions.database.ref('/oppAllowedTeam/{key}/teamKey')
    .onUpdate(teamToOATDenormalizers.onChildForeignKeyChange)

export const teamToOATOATOnCreate =
  functions.database.ref('/oppAllowedTeam/{key}/teamKey')
    .onCreate(teamToOATDenormalizers.onChildForeignKeyChange)
