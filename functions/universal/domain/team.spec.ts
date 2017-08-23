import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { teamTransform } from './team'
import { validationFailure } from '../validation/validation';


describe('teamTransform', () => {

  it('requires several fields to be defined', done => {
    teamTransform({

    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'title', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'description', 'isDefined')).toBeTruthy()
      })
      .then(done)
  });

  it('requires several fields to not be empty', done => {
    teamTransform({
      $key: "",
      oppKey: "1",
      title: "",
      description: "",
      icon: "",
      question: "?"
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'title', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'description', 'isNotEmpty')).toBeTruthy()
      })
      .then(done)
  });

});
