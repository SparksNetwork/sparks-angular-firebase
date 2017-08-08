import { IsUrl, IsNotEmpty, IsDefined } from 'class-validator/decorator/decorators'

export class ImageRef {
    @IsUrl()
    @IsDefined()
    @IsNotEmpty()
    imageUrl: string;
}
