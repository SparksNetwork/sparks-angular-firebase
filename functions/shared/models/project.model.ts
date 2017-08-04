import { ProjectType } from "../enums/project-type.enum";
import { Location } from "./location.model";
import { Image } from "./image.model";
import { Organizer } from "./organizer.model";
import { IsEnum, IsDateString, IsOptional, ValidateNested, IsNumber, IsInt, IsUrl } from 'class-validator/decorator/decorators'

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
    location: Location;

    @ValidateNested()
    images: Image[];

    @IsNumber()
    ticketPrice?: number;

    @IsInt()
    maxKarmaPoints: number;

    @ValidateNested()
    organizer: Organizer;

    @IsUrl()
    projectPageUrl?: string;

    @IsOptional()
    @IsInt()
    shareKarmaPoints?: number;
}