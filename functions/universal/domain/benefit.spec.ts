import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { benefitTransform } from './benefit'


function validationFailure(errs: ValidationError[], property: string, constraint: string) {
  return errs.find(err => err.property === property).constraints[constraint]
}

describe('benefitTransform', () => {

  it('requires several fields to be defined', done => {
    benefitTransform({

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

    benefitTransform({ $key: "", description: "", icon: "", oppKey: "", title: "", type: "FoodDrink" })
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

  it('requires project type to be Enum', done => {


    benefitTransform({
      $key: "1",
      description: "Benefit",
      icon: "",
      oppKey: "",
      title: "",
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


});
