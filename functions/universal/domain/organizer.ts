import { IsUrl, IsNotEmpty, IsDefined } from 'class-validator/decorator/decorators'

export class Organizer {
    @IsDefined()
    @IsNotEmpty()
    organizerKey: string;

    @IsDefined()
    @IsNotEmpty()
    name: string;

    @IsDefined()
    @IsNotEmpty()
    organization: string;

    @IsUrl()
    imageUrl?: string;
}