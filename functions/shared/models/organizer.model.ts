import { IsUrl, IsNotEmpty } from 'class-validator/decorator/decorators'

export class Organizer {
    @IsNotEmpty()
    organizerKey: string;

    name: string;

    organization: string;

    @IsUrl()
    imageUrl?: string;
}