import { IsNumber, IsInt, IsNotEmpty } from 'class-validator/decorator/decorators'

export class Opportunity {
    @IsNotEmpty()
    oppKey: string;

    @IsNotEmpty()
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