import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { teamTransform } from './team'

function validationFailure(errs: ValidationError[], property: string, constraint: string) {
  return errs.find(err => err.property === property).constraints[constraint]
}

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

});
