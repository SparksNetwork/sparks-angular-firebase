import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { oppAllowedTeamTransform } from './oppAllowedTeam'
import { validationFailure, NESTED } from '../validation/validation';


describe('oppAllowedTeamTransform', () => {

  it('requires several fields to be defined', done => {
    oppAllowedTeamTransform({

    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'oppKey', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'teamKey', 'isDefined')).toBeTruthy()
      })
      .then(done)
  });

  it('requires several fields to not be empty', done => {
    oppAllowedTeamTransform({
      $key: "",
      oppKey: "",
      teamKey: "",
      team: {}
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'oppKey', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'teamKey', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'team', 'isNotEmpty', NESTED, '$key')).toBeTruthy()
        expect(validationFailure(errs, 'team', 'isNotEmpty', NESTED, 'title')).toBeTruthy()
        expect(validationFailure(errs, 'team', 'isNotEmpty', NESTED, 'description')).toBeTruthy()
      })
      .then(done)
  });


});
 