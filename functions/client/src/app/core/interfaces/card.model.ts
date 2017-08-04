import { CardItemStatus } from '../enums/card-item-status.enum';
import { IsEnum } from 'class-validator/decorator/decorators'

export class Card {
    key: string;

    title: string;

    description: string;

    icon?: string;

    @IsEnum(CardItemStatus)
    status?: CardItemStatus;
}