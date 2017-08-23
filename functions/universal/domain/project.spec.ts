import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { projectTransform } from './project'

function validationFailure(errs: ValidationError[], property: string, constraint: string, isNested: boolean = false, childProperty:string = null) {
  const propertyError = errs.find(err => err.property === property);

  if (isNested) {
    for (let i=0; i < propertyError.children.length; i++) {
      const childError = propertyError.children[i].children.find(c => c.property === childProperty);
      if (childError) {
        return childError.constraints[constraint];
      }
    }
  }
  return propertyError.constraints[constraint]
}

describe('projectTransform', () => {

  it('requires several fields to be defined', done => {
    projectTransform({

    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'title', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'description', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'startDateTime', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'location', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'maxKarmaPoints', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'organizer', 'isDefined')).toBeTruthy()
      })
      .then(done)
  });

  it('requires several fields to not be empty', done => {
    projectTransform({
      $key: "",
      projectType: "Simple",
      title: "",
      description: "",
      startDateTime: "2017-07-15T19:00:00.000Z",
      endDateTime: "2017-07-15T19:00:00.000Z",
      location: {},
      images: [{ imageUrl: "" }],
      ticketPrice: 3,
      maxKarmaPoints: 3,
      organizer: {},
      projectPageUrl: "",
      shareKarmaPoints: 2,
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'title', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'description', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'images', 'isNotEmpty', true, 'imageUrl')).toBeTruthy()
      })
      .then(done)
  });

  it('requires projectType to be enum', done => {
    projectTransform({
      $key: "1",
      projectType: "NotEnum",
      title: "title",
      description: "",
      startDateTime: "2017-07-15T19:00:00.000Z",
      endDateTime: "2017-07-15T19:00:00.000Z",
      location: {},
      images: [{}],
      ticketPrice: 3,
      maxKarmaPoints: 3,
      organizer: {},
      projectPageUrl: "",
      shareKarmaPoints: 2,
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'projectType', 'isEnum')).toBeTruthy()

      })
      .then(done)
  });

  it('requires start and end date to be in correct format', done => {
    projectTransform({
      $key: "1",
      projectType: "Simple",
      title: "title",
      description: "",
      startDateTime: "2017-07-15",
      endDateTime: "2017-07-15",
      location: {},
      images: [{}],
      ticketPrice: 3,
      maxKarmaPoints: 3,
      organizer: {},
      projectPageUrl: "",
      shareKarmaPoints: 2,
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'startDateTime', 'isDateString')).toBeTruthy()
        expect(validationFailure(errs, 'endDateTime', 'isDateString')).toBeTruthy()

      })
      .then(done)
  });

  it('requires ticketPrice to be a number', done => {
    projectTransform({
      $key: "1",
      projectType: "Simple",
      title: "title",
      description: "",
      startDateTime: "2017-07-15",
      endDateTime: "2017-07-15",
      location: {},
      images: [{}],
      ticketPrice: "d",
      maxKarmaPoints: 3,
      organizer: {},
      projectPageUrl: "",
      shareKarmaPoints: 2,
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'ticketPrice', 'isNumber')).toBeTruthy()
      })
      .then(done)
  });

  it('requires some fields to be integers', done => {
    projectTransform({
      $key: "1",
      projectType: "Simple",
      title: "title",
      description: "",
      startDateTime: "2017-07-15",
      endDateTime: "2017-07-15",
      location: {},
      images: [{}],
      ticketPrice: 3,
      maxKarmaPoints: 3.3,
      organizer: {},
      projectPageUrl: "",
      shareKarmaPoints: 2.4,
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'maxKarmaPoints', 'isInt')).toBeTruthy()
        expect(validationFailure(errs, 'shareKarmaPoints', 'isInt')).toBeTruthy()
      })
      .then(done)
  });

  it('requires projectPageUrl and imageUrl to be URL', done => {
    projectTransform({
      $key: "1",
      projectType: "Simple",
      title: "title",
      description: "",
      startDateTime: "2017-07-15",
      endDateTime: "2017-07-15",
      location: {},
      images: [{ imageUrl: "" }],
      ticketPrice: 3,
      maxKarmaPoints: 3.3,
      organizer: {},
      projectPageUrl: "test-test",
      shareKarmaPoints: 2.4,
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'projectPageUrl', 'isUrl')).toBeTruthy()
        expect(validationFailure(errs, 'images', 'isUrl', true, 'imageUrl')).toBeTruthy()
      })
      .then(done)
  });

});
