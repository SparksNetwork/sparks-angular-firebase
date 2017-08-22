import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { contribTransform } from './contrib'

function validationFailure(errs: ValidationError[], property: string, constraint: string) {
  return errs.find(err => err.property === property).constraints[constraint]
}

describe('contribTransform', () => {

  it('requires several fields to be defined', done => {
    contribTransform({

    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'oppKey', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'title', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'description', 'isDefined')).toBeTruthy()
      })
      .then(done)
  });

  it('requires several fields to not be empty', done => {
    contribTransform({
      $key: "",
      oppKey: "",
      shiftMinLength: 4,
      shiftMaxLength: 4,
      description: "",
      icon: "glyphicon-time",
      title: "",
      type: "Shift"
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'oppKey', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'title', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'description', 'isNotEmpty')).toBeTruthy()
      })
      .then(done)
  });

  it('requires contribType to be Enum', done => {
    contribTransform({
      $key: "1",
      oppKey: "",
      shiftMinLength: 4,
      shiftMaxLength: 4,
      description: "",
      icon: "glyphicon-time",
      title: "CTitle",
      type: "NotEnum"
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'type', 'isEnum')).toBeTruthy()
      })
      .then(done)
  });

  it('requires several fields to be int', done => {
    contribTransform({
      $key: "1",
      oppKey: "",
      shiftMinLength: "a",
      shiftMaxLength: "B",
      description: "",
      icon: "glyphicon-time",
      title: "",
      type: "Shift"
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'shiftMinLength', 'isInt')).toBeTruthy()
        expect(validationFailure(errs, 'shiftMaxLength', 'isInt')).toBeTruthy()
 
      })
      .then(done)
  });

});
