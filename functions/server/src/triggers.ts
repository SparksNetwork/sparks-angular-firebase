import 'reflect-metadata';
import { functions, admin } from './firebase-functions-env'
import * as firebase from 'firebase'
import * as functionsTypes from 'firebase-functions'

import { BaseCollection } from '../../lib/firebase-universal/server'

const getKeys = (snap: firebase.database.DataSnapshot) => Object.keys(snap.val())

function denormalizerFromParentChange(
  parentCollection: BaseCollection,
  childCollection: BaseCollection,
  foreignKey: string,
  denormalizedField: string
) {
  return function(evt: functionsTypes.Event<functionsTypes.database.DeltaSnapshot>) {
    const newData = evt.data.val()
    const parentKey = evt.params.key
    const updateDenormalizedField = key => {
      console.log(
        new Date(),
        'denorm/parent:',
        `${parentCollection.ref.key}/${parentKey} =>`,
        `${childCollection.ref.key}/${key}/${denormalizedField}`,
      )
      childCollection.one(key).child(denormalizedField).set(newData)
    }

    return (childCollection.by(foreignKey, parentKey) as firebase.database.Query)
      .once('value')
      .then(getKeys)
      .then(keys => Promise.all(keys.map(updateDenormalizedField)))
  }
}

function denormalizerFromChildForeignKeyChange(
  parentCollection: BaseCollection,
  childCollection: BaseCollection,
  denormalizedField: string
) {
  return function(evt: functionsTypes.Event<functionsTypes.database.DeltaSnapshot>) {
    const parentKey = evt.data.val()
    const childKey = evt.params.key
    console.log(
      new Date(),
      'denorm/child: ',
      `${childCollection.ref.key}/${childKey}/${denormalizedField} <=`,
      `${parentCollection.ref.key}/${parentKey}`
    )
    return parentCollection.one(parentKey)
      .once('value')
      .then(snap => snap.val())
      .then(val => val && childCollection.one(childKey).child(denormalizedField).set(val))
      .then(val => console.log('denorm/child complete', val))
  }
}

function denormalizers(
  parentCollection: BaseCollection,
  childCollection: BaseCollection,
  foreignKey: string,
  denormalizedField: string,
) {
  return {
    onParentChange: denormalizerFromParentChange(
      parentCollection,
      childCollection,
      foreignKey,
      denormalizedField
    ),
    onChildForeignKeyChange: denormalizerFromChildForeignKeyChange(
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
export const teamToOATTeamOnUpdate =
  functions.database.ref('/team/{key}')
    .onUpdate(teamToOATDenormalizers.onParentChange)

export const teamToOATTeamOnCreate =
  functions.database.ref('/team/{key}')
    .onCreate(teamToOATDenormalizers.onParentChange)

export const teamToOATOATOnUpdate =
  functions.database.ref('/oppAllowedTeam/{key}/teamKey')
    .onUpdate(teamToOATDenormalizers.onChildForeignKeyChange)

export const teamToOATOATOnCreate =
  functions.database.ref('/oppAllowedTeam/{key}/teamKey')
    .onCreate(teamToOATDenormalizers.onChildForeignKeyChange)
