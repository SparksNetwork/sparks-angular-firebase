import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { applicationTransform } from './application'
import { validationFailure } from '../validation/validation';


describe('applicationTransform', () => {

    it('requires $key to be defined', done => {
        applicationTransform({

        })
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, '$key', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'oppKey', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'profileKey', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'projectProfileKey', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'createdOn', 'isDefined')).toBeTruthy()
            })
            .then(done)
    });

    it('requires several fields to not be empty', done => {
        applicationTransform({
            $key: "",
            oppKey: "",
            profileKey: "",
            projectKey: "",
            projectProfileKey: "",
            oppQuestion: "",
            oppAnswer: ""
        })
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, '$key', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'oppKey', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'profileKey', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'projectKey', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'projectProfileKey', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'oppQuestion', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'oppAnswer', 'isNotEmpty')).toBeTruthy()
            })
            .then(done)
    });

    it('requires fields to be in correct format', done => {
        applicationTransform({
            createdOn: '03-01-1900',
            submittedOn: '03-01-1900',
            acceptedOn: '03-01-1900',
            canceledOn: '03-01-1900'
        })
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, 'createdOn', 'isDateString')).toBeTruthy()
                expect(validationFailure(errs, 'submittedOn', 'isDateString')).toBeTruthy()
                expect(validationFailure(errs, 'acceptedOn', 'isDateString')).toBeTruthy()
                expect(validationFailure(errs, 'canceledOn', 'isDateString')).toBeTruthy()
            })
            .then(done)
    });

    it('requires step type to be Enum', done => {

        applicationTransform({
            step: "Unknown"
        })
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, 'step', 'isEnum')).toBeTruthy()
            })
            .then(done)
    });

});
