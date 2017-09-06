import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { applicationShiftTransform } from './applicationShift'
import { validationFailure } from '../validation/validation';


describe('applicationShiftTransform', () => {

    it('requires several fields to be defined', done => {
        applicationShiftTransform({})
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, '$key', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'appKey', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'shiftKey', 'isDefined')).toBeTruthy()
            })
            .then(done)
    });

    it('requires several fields to not be empty', done => {
        applicationShiftTransform({
            $key: '',
            appKey: '',
            shiftKey: '',
            joinedOn: '',
        })
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, '$key', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'appKey', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'shiftKey', 'isNotEmpty')).toBeTruthy()
            })
            .then(done)
    });

    it('requires fields to be in correct format', done => {
        applicationShiftTransform({
            joinedOn: '03-01-1900',
        })
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, 'joinedOn', 'isDateString')).toBeTruthy()
            })
            .then(done)
    });
});
