import { ValidationError } from 'class-validator'

export const logErrors = function (errs: ValidationError[]) {
  console.log('Validation Errors:')
  if (errs instanceof Error) {
    console.log(errs.message);
  } else {
    errs.forEach(err => {
        console.log('property', err.property)
        Object.keys(err.constraints).forEach(cKey => console.log(err.constraints[cKey]))
      })
  }
}