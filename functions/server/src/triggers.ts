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

console.log('TRIGGERS: exporting')

import { ProfileCollection } from '../../universal/domain/profile'
import { ProjectCollection } from '../../universal/domain/project'
const profiles = new ProfileCollection(admin.database())
const projects = new ProjectCollection(admin.database())

const profileToProjectDenormalizers = denormalizers(
  profiles,
  projects,
  'organizerProfileKey',
  'organizerProfile'
)
export const profileToProjectProfileOnUpdate =
  functions.database.ref('/profile/{key}')
    .onUpdate(profileToProjectDenormalizers.onParentChange)

export const profileToProjectProfileOnCreate =
  functions.database.ref('/profile/{key}')
    .onCreate(profileToProjectDenormalizers.onParentChange)

export const profileToProjectProjectOnUpdate =
  functions.database.ref('/project/{key}/organizerProfileKey')
    .onUpdate(profileToProjectDenormalizers.onChildForeignKeyChange)

export const profileToProjectProjectOnCreate =
  functions.database.ref('/project/{key}/organizerProfileKey')
    .onCreate(profileToProjectDenormalizers.onChildForeignKeyChange)

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

import { ApplicationCollection } from '../../universal/domain/application'
const applications = new ApplicationCollection(admin.database())

const projectToApplicationDenormalizers = denormalizers(
  projects,
  applications,
  'projectKey',
  'project'
)

export const projectToApplicationOnCreate =
  functions.database.ref('/project/{key}')
    .onCreate(projectToApplicationDenormalizers.onParentChange)
export const projectToApplicationOnUpdate =
    functions.database.ref('/project/{key}')
    .onUpdate(projectToApplicationDenormalizers.onParentChange)
export const projectToApplicationOnChildCreate =
  functions.database.ref('/application/{key}/projectKey')
    .onCreate(projectToApplicationDenormalizers.onChildForeignKeyChange)
export const projectToApplicationOnChildUpdate =
  functions.database.ref('/application/{key}/projectKey')
    .onUpdate(projectToApplicationDenormalizers.onChildForeignKeyChange)

import { OppCollection } from '../../universal/domain/opp'
const opps = new OppCollection(admin.database())

const oppToApplicationDenormalizers = denormalizers(
  opps,
  applications,
  'oppKey',
  'opp'
)

export const oppToApplicationOnCreate =
  functions.database.ref('/opp/{key}')
    .onCreate(oppToApplicationDenormalizers.onParentChange)
export const oppToApplicationOnUpdate =
  functions.database.ref('/opp/{key}')
    .onUpdate(oppToApplicationDenormalizers.onParentChange)
export const oppToApplicationOnChildCreate =
  functions.database.ref('/application/{key}/oppKey')
    .onCreate(oppToApplicationDenormalizers.onChildForeignKeyChange)
export const oppToApplicationOnChildUpdate =
  functions.database.ref('/application/{key}/oppKey')
    .onUpdate(oppToApplicationDenormalizers.onChildForeignKeyChange)

import { ShiftCollection } from '../../universal/domain/shift'
import { ApplicationShiftCollection } from '../../universal/domain/applicationShift'
const shifts = new ShiftCollection(admin.database())
const appShifts = new ApplicationShiftCollection(admin.database())

const shiftToAppShiftDenormalizers = denormalizers(
  shifts,
  appShifts,
  'shiftKey',
  'shift'
)

export const shiftToAppShiftOnCreate =
  functions.database.ref('/shift/{key}')
    .onCreate(shiftToAppShiftDenormalizers.onParentChange)
export const shiftToAppShiftOnUpdate =
  functions.database.ref('/shift/{key}')
    .onUpdate(shiftToAppShiftDenormalizers.onParentChange)
export const shiftToAppShiftOnChildCreate =
  functions.database.ref('/applicationShift/{key}/shiftKey')
    .onCreate(shiftToAppShiftDenormalizers.onChildForeignKeyChange)
export const shiftToAppShiftOnChildUpdate =
  functions.database.ref('/applicationShift/{key}/shiftKey')
    .onUpdate(shiftToAppShiftDenormalizers.onChildForeignKeyChange)
