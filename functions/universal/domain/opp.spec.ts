import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { oppTransform } from './opp'
import { validationFailure } from '../validation/validation';


describe('oppTransform', () => {

  it('requires several fields to be defined', done => {
    oppTransform({

    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'projectKey', 'isDefined')).toBeTruthy()
        expect(validationFailure(errs, 'title', 'isDefined')).toBeTruthy()
      })
      .then(done)
  });


  it('requires several fields to not be empty', done => {

    oppTransform({
      $key: "",
      projectKey: "",
      icon: "",
      contribValue: 2,
      benefitValue: 4,
      title: "",
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'projectKey', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'title', 'isNotEmpty')).toBeTruthy()
      })
      .then(done)
  });

    it('requires several fields to be numbers', done => {

    oppTransform({
      $key: 'L1',
      projectKey: 'L2',
      icon: "",
      contribValue: 'letters',
      benefitValue: 't',
      title: "title",
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, 'contribValue', 'isNumber')).toBeTruthy()
        expect(validationFailure(errs, 'benefitValue', 'isNumber')).toBeTruthy()
      })
      .then(done)
  });

});
