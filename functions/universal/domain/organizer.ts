import { IsUrl } from 'class-validator/decorator/decorators'
import { IsNotEmpty } from "class-validator";

export class Organizer {
    @IsNotEmpty()
    organizerKey: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    organization: string;

    @IsUrl()
    imageUrl?: string;
}