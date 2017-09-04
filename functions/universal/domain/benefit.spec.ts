import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { benefitTransform } from './benefit'
import { validationFailure } from '../validation/validation';


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

    benefitTransform({
      $key: "",
      description: "",
      icon: "",
      oppKey: "",
      title: "",
      type: "FoodDrink"
    })
      .then(() => {
        expect(false).toBeTruthy()
      })
      .catch((errs: ValidationError[]) => {
        expect(validationFailure(errs, '$key', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'oppKey', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'title', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'description', 'isNotEmpty')).toBeTruthy()
        expect(validationFailure(errs, 'icon', 'isNotEmpty')).toBeTruthy()
      })
      .then(done)
  });

  it('requires project type to be Enum', done => {

    benefitTransform({
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

  it('requires value to be a number', done => {
    
        benefitTransform({
          value: "zz"
        })
          .then(() => {
            expect(false).toBeTruthy()
          })
          .catch((errs: ValidationError[]) => {
            expect(validationFailure(errs, 'value', 'isNumber')).toBeTruthy()
          })
          .then(done)
      });

});
