import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { shiftTransform } from './shift'
import { validationFailure } from '../validation/validation';


describe('shiftTransform', () => {

    it('requires several fields to be defined', done => {
        shiftTransform({})
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, '$key', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'startDateTime', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'teamKey', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'teamTitle', 'isDefined')).toBeTruthy()
            })
            .then(done)
    });

    it('requires several fields to not be empty', done => {
        shiftTransform({
            $key: "",
            startDateTime: "",            
            teamKey: "",
            teamTitle: "",
            teamIcon: "",
        })
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, '$key', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'startDateTime', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'teamKey', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'teamTitle', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'teamIcon', 'isNotEmpty')).toBeTruthy()
            })
            .then(done)
    });

    it('requires fields to be in correct format', done => {
        shiftTransform({
            startDateTime: '03-01-1900',
            endDateTime: '03-01-1900',            
        })
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, 'startDateTime', 'isDateString')).toBeTruthy()
                expect(validationFailure(errs, 'endDateTime', 'isDateString')).toBeTruthy()
            })
            .then(done)
    });
});
