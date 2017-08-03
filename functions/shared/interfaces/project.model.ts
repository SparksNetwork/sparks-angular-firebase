import { ProjectType } from "../enums/project-type.enum";
import { ILocation } from "./location.model";
import { IImage } from "./image.model";
import { IOrganizer } from "./organizer.model";

export interface IProject {
    projectKey: string;
    projectType: ProjectType;
    title: string;
    description: string;
    startDateTime: string;
    endDateTime?: string;
    location: ILocation;
    images: IImage[];
    ticketPrice?: number;
    maxKarmaPoints: number;
    organizer: IOrganizer;
    projectPageUrl?: string;
    shareKarmaPoints?: number;
}