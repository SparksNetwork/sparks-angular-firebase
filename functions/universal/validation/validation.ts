import { ValidationError } from "class-validator";

export const NESTED = true
export const ARRAY = true

export const validationFailure = function (errs: ValidationError[], property: string, constraint: string, isNested: boolean = false, childProperty: string = null, isArray: boolean = false) {
  const validationError = getValidationError(errs, property, isNested, childProperty, isArray);
  return validationError.constraints[constraint]
}

function getValidationError(errs: ValidationError[], property: string, isNested: boolean = false, childProperty: string = null, isArray: boolean = false): ValidationError {
   if (!isNested) {
     return errs.find(err => err.property === property);
   }
   
   const parentError = errs.find(err => err.property === property);

   if (isArray) {
    for (let i = 0; i < parentError.children.length; i++) {
      const childError = parentError.children[i].children.find(c => c.property === childProperty);
      if (childError) {
        return childError;
      }
    }
   } else {
     return parentError.children.find(c => c.property === childProperty);
   }

   return null;
}