import { FormControl, Validators } from "@angular/forms";
import * as moment from 'moment'

export class ValidatorService {

    constructor() { }

    public static phoneNumberValidator(control: FormControl) {
        if (ValidatorService.isPresent(Validators.required(control))) return null;

        const regexp = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
        return regexp.test(control.value) ? null : { 'phone': { valid: false } };
    }

    public static dateValidator(control: FormControl) {
        if (ValidatorService.isPresent(Validators.required(control))) return null;

        console.log(control.value);

        const dateFormat = 'YYYY-MM-DD';
        return moment(control.value, dateFormat, true).isValid() ? null : { 'date': { valid: false } };
    }

    private static isPresent(obj: any): boolean {
        return obj !== undefined && obj !== null;
    }
}
