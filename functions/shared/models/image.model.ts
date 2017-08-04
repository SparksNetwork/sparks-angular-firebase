import { IsUrl } from 'class-validator/decorator/decorators'

export class Image {
    @IsUrl()
    imageUrl: string;
}