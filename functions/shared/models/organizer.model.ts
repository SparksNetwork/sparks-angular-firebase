import { IsUrl } from 'class-validator/decorator/decorators'

export class Organizer {
    organizerKey: string;

    name: string;

    organization: string;

    @IsUrl()
    imageUrl?: string;
}