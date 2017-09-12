import {
    ValidatorConstraint, ValidationOptions,
    registerDecorator, ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';


export function IsDateGreaterThan(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsDateGreaterThanConstraint
        });
    };
}

@ValidatorConstraint({ name: 'isDateGreaterThan' })
export class IsDateGreaterThanConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            new Date(value).getTime() > new Date(relatedValue).getTime();
    }
}
