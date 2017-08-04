import { ProjectType } from "../enums/project-type.enum";
import { Location } from "./location.model";
import { Image } from "./image.model";
import { Organizer } from "./organizer.model";
import { IsEnum, IsDateString, ValidateNested, IsNumber, IsInt, IsUrl, IsNotEmpty } from 'class-validator/decorator/decorators'

export class Project {
    @IsNotEmpty()
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

    @IsInt()
    shareKarmaPoints?: number;
}