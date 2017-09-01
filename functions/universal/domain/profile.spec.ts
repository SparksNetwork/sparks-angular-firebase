import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { profileTransform } from './profile'
import { validationFailure } from '../validation/validation';


describe('profileTransform', () => {

  it('requires $key to be defined', done => {
    profileTransform({

    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isDefined')).toBeTruthy()
      })
      .then(done)
  });

  it('requires several fields to not be empty', done => {
    profileTransform({
      $key: "",
      legalName: "",
      preferredName: ""
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'legalName', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'preferredName', 'isNotEmpty')).toBeTruthy()
      })
      .then(done)
  });

  it('requires fields to be in correct format', done => {
    profileTransform({
        phoneNumber: '123',
        birthday: '03-01-1900'
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'phoneNumber', 'matches')).toBeTruthy()
        expect(validationFailure(errs, 'birthday', 'isIso8601')).toBeTruthy()
      })
      .then(done)
  });

});
