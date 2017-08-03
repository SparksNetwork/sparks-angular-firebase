import { ProjectType } from "../enums/project-type.enum";
import { ILocation } from "./location.model";
import { IImage } from "./image.model";
import { IOrganizer } from "./organizer.model";
import { IsEnum, IsDateString, IsOptional, ValidateNested, IsNumber, IsInt, IsUrl } from 'class-validator/decorator/decorators'
import { ValidateIf } from "class-validator";

export class Project {
    projectKey: string;

    @IsEnum(ProjectType)
    projectType: ProjectType;

    title: string;

    description: string;

    @IsDateString()
    startDateTime: string;

    @IsDateString()
    endDateTime?: string;

    @ValidateNested()
    location: ILocation;

    @ValidateNested()
    images: IImage[];

    @IsNumber()
    ticketPrice?: number;

    @IsInt()
    maxKarmaPoints: number;

    @ValidateNested()
    organizer: IOrganizer;

    @IsUrl()
    projectPageUrl?: string;

    @IsOptional()
    @IsInt()
    shareKarmaPoints?: number;
}