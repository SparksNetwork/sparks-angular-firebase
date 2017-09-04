import 'jasmine'
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidationError } from 'class-validator'

import { applicationTeamTransform } from './applicationTeam'
import { validationFailure } from '../validation/validation';


describe('applicationTeamTransform', () => {

    it('requires $key to be defined', done => {
        applicationTeamTransform({

        })
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, '$key', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'teamKey', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'appKey', 'isDefined')).toBeTruthy()
                expect(validationFailure(errs, 'joinedOn', 'isDefined')).toBeTruthy()
            })
            .then(done)
    });

    it('requires several fields to not be empty', done => {
        applicationTeamTransform({
            $key: "",
            teamKey: "",
            appKey: "",
            question: "",
            answer: ""
        })
            .then(() => {
                expect(false).toBeTruthy()
            })
            .catch((errs: ValidationError[]) => {
                expect(validationFailure(errs, '$key', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'teamKey', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'appKey', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'question', 'isNotEmpty')).toBeTruthy()
                expect(validationFailure(errs, 'answer', 'isNotEmpty')).toBeTruthy()
            })
            .then(done)
    });

    it('requires fields to be in correct format', done => {
        applicationTeamTransform({
            joinedOn: '03-01-1900'
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
