import { IsNumber, IsInt } from 'class-validator/decorator/decorators'

export class Opportunity {
    oppKey: string;

    projectKey: string;

    title: string;

    summary: string;

    @IsInt()
    karma?: number;

    icon?: string;

    @IsNumber()
    benefitValue?: number;

    @IsNumber()
    contribValue?: number;
}