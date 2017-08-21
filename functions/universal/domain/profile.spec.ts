import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { profileTransform } from './profile'

function validationFailure(errs: ValidationError[], property: string, constraint: string) {
  return errs.find(err => err.property === property).constraints[constraint]
}

describe('profileTransform', () => {

  it('requires fields to be in correct format', done => {
    profileTransform({
        phoneNumber: '123',
        birthday: '03-01-1900'
    })
      .then(() => {
        //expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'phoneNumber', 'isMobilePhone')).toBeTruthy()
        expect(validationFailure(errs, 'birthday', 'isIso8601')).toBeTruthy()
      })
      .then(done)
  });

});
