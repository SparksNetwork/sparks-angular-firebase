import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { projectTransform } from './project'
import { validationFailure, NESTED, ARRAY } from '../validation/validation'


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

  it('requires several organizer fields to be defined', done => {
    projectTransform({
      organizer: {}
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'organizer', 'isDefined', NESTED, 'organizerKey')).toBeTruthy()
        expect(validationFailure(errs, 'organizer', 'isDefined', NESTED, 'name')).toBeTruthy()
        expect(validationFailure(errs, 'organizer', 'isDefined', NESTED, 'organization')).toBeTruthy()
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
      organizer: {
        organizerKey: "",
        name: "",
        organization: ""
      },
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
        expect(validationFailure(errs, 'images', 'isNotEmpty', NESTED, 'imageUrl', ARRAY)).toBeTruthy()
        expect(validationFailure(errs, 'organizer', 'isNotEmpty', NESTED, 'organizerKey')).toBeTruthy()
        expect(validationFailure(errs, 'organizer', 'isNotEmpty', NESTED, 'name')).toBeTruthy()
        expect(validationFailure(errs, 'organizer', 'isNotEmpty', NESTED, 'organization')).toBeTruthy()
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

  it('requires several fields to be URL', done => {
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
      organizer: { imageUrl: "" },
      projectPageUrl: "test-test",
      shareKarmaPoints: 2.4,
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'projectPageUrl', 'isUrl')).toBeTruthy()
        expect(validationFailure(errs, 'images', 'isUrl', NESTED, 'imageUrl', ARRAY)).toBeTruthy()
        expect(validationFailure(errs, 'organizer', 'isUrl', NESTED, 'imageUrl')).toBeTruthy()
      })
      .then(done)
  });

  it('requires location coordinate fields to match a pattern', done => {
    projectTransform({
      $key: "1",
      projectType: "Simple",
      title: "title",
      description: "",
      startDateTime: "2017-07-15",
      endDateTime: "2017-07-15",
      location: {
        latitude: "",
        longitude: ""
      },
      images: [{ }],
      ticketPrice: 3,
      maxKarmaPoints: 3.3,
      organizer: { },
      projectPageUrl: "test-test",
      shareKarmaPoints: 2.4,
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'location', 'matches', NESTED, 'latitude')).toBeTruthy()
        expect(validationFailure(errs, 'location', 'matches', NESTED, 'latitude')).toBeTruthy()
      })
      .then(done)
  });

});
