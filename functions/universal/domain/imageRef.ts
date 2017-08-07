import { IsUrl, IsNotEmpty } from 'class-validator/decorator/decorators'

export class ImageRef {
    @IsUrl()
    @IsNotEmpty()
    imageUrl: string;
}
