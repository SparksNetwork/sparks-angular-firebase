import { IsNotEmpty, IsEnum, IsInt } from 'class-validator/decorator/decorators'
import { ContribType } from "../enums/contrib-type.enum";

export class Contribution {
    @IsNotEmpty()
    contribKey: string;

    @IsNotEmpty()
    oppKey: string;

    @IsEnum(ContribType)
    type: ContribType;

    title: string;

    description: string;

    icon?: string;

    @IsInt()
    shiftMinLength?: number;

    @IsInt()
    shiftMaxLength?: number;
}